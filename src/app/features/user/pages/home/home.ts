import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {Posts} from '../../components/posts/posts';
import {RouterLink} from '@angular/router';
import {HomeService} from './home-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Popup} from '../../../../shared/popup/popup';
import {CustomInput} from '../../../../shared/custom-input/custom-input';
import {CustomDropdown, DropdownData} from '../../../../shared/custom-dropdown/custom-dropdown';
import {form, minLength, required} from '@angular/forms/signals';
import {CommonModule} from '@angular/common';
import {AuthPopup} from '../../../../shared/auth-popup/auth-popup';

@Component({
  selector: 'app-home',
  imports: [
    Posts,
    RouterLink,
    Popup,
    CustomInput,
    CustomDropdown,
    CommonModule,
    AuthPopup,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly homeService = inject(HomeService);
  protected readonly posts = signal<any>([]);

  // POPUPS
  protected isShownAddPostPopup = signal<boolean>(false);
  protected isShownStatusPopup = signal<boolean>(false);
  protected isShownAuthPopup = signal<boolean>(false);

  private readonly destroyRef = inject(DestroyRef);
  public readonly categoryDropdownData = signal<DropdownData[]>([])
  public readonly selectedCategory = signal<DropdownData | null>(null);

  protected isFeatured = signal<boolean>(false);
  protected selectedStatus = signal<Status>('PRIVATE');

  addPostModel = signal(<ICreatePost>{
    title: '',
    caption: '',
    categoryId: null,
    content: '',
    status: null,
    featured: false,
    coverImageurl: ''
  })

  addPostForm = form(this.addPostModel, (schemaPath) => {
    required(schemaPath.title, {message: "Title is required"});
    minLength(schemaPath.title, 6, {message: "Title minLength is 6"});

    required(schemaPath.caption, {message: "Caption is required"});
    minLength(schemaPath.caption, 6, {message: "Caption minLength is 6"});

    required(schemaPath.categoryId, {message: "Category is required"});

    required(schemaPath.content, {message: "Content is required"});
  })


  ngOnInit() {
    this.getPosts();
  }

  private getPosts(): void {
    this.homeService.getPosts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((posts: IPostContent) => {
      this.posts.set(posts.content);
    })
  }

  private getCategories(): void {
    this.homeService.getCategories().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((categories: ICategory[]) => {
      this.categoryDropdownData.set(categories.map((category: ICategory) => ({
        id: category.id,
        value: category.name
      })))
    })
  }

  protected showAddPostPopup(): void {
    if(sessionStorage.getItem('accessToken') === null){
      this.isShownAuthPopup.set(true);
      return;
    }
    this.getCategories();
    this.isShownAddPostPopup.set(true);
  }

  protected showStatusPopup(): void {
    event?.preventDefault();
    this.addPostForm.categoryId().value.set(this.selectedCategory()?.id ?? null);
    if (this.addPostForm().invalid()) {
      console.log(this.addPostForm().value())
      return;
    }
    this.isShownStatusPopup.set(true);
  }

  protected createPost(): void {

    const dataToSend = {
      ...this.addPostForm().value(),
      categoryId: this.selectedCategory()?.id,
      featured: this.isFeatured(),
      status: this.selectedStatus()
    };

    this.homeService.createPost(dataToSend).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.isShownStatusPopup.set(false);
        this.isShownAddPostPopup.set(false);
        this.getPosts();
        this.addPostModel.set({
          title: '',
          caption: '',
          categoryId: null,
          content: '',
          status: null,
          featured: false,
          coverImageurl: ''
        })
        this.addPostForm().reset();
      }, error: error => {
        console.log(error);
      }
    })
  }
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
}

export interface IAuthor {
  id: number;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
}

export type Status = 'DRAFT' | 'PRIVATE' | 'PUBLISHED' | 'ARCHIVED';

export interface IPostSummery {
  id: number;
  title: string;
  slug: string;
  caption: string;
  coverImgUrl: string;
  featured: boolean;
  status: Status;
  publishedAt: string;
  category: ICategory;
  author: IAuthor;
}

export interface IPostContent {
  page: number;
  size: number;
  totalElements: number;
  content: IPostSummery[];
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
}

export interface ICreatePost {
  "title": string,
  "caption": string,
  "content": string,
  "coverImageurl": string,
  "featured": boolean,
  "categoryId": number | null,
  "status": Status | null,
}
