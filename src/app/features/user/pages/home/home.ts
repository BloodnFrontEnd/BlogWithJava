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
import {ICreatePost, IPostDTO, PostsService, StatusType} from '../../services/posts-service';
import {CategoryService, ICategory} from '../../services/category-service';
import {ContentChange, QuillEditorComponent} from 'ngx-quill';
import {exhaustAll, Subject} from 'rxjs';
import {LoaderService} from '../../../../core/loader/loader-service';

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
    QuillEditorComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly categoryService = inject(CategoryService);
  private readonly loaderService = inject(LoaderService);

  protected readonly posts = signal<any>([]);

  // POPUPS
  protected isShownAddPostPopup = signal<boolean>(false);
  protected isShownStatusPopup = signal<boolean>(false);
  protected isShownAuthPopup = signal<boolean>(false);

  private readonly destroyRef = inject(DestroyRef);
  public readonly categoryDropdownData = signal<DropdownData[]>([])
  public readonly selectedCategory = signal<DropdownData | null>(null);

  protected isFeatured = signal<boolean>(false);
  protected selectedStatus = signal<StatusType>('PRIVATE');

  addPostModel = signal(<PostModel>{
    title: '',
    caption: '',
    description: '',
    categoryId: null,
    content: '',
    coverImgUrl: '',
    featured: null,
    status: null,
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

  protected editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],

      [{ header: [1, 2, 3, false] }],

      [{ list: 'ordered' }, { list: 'bullet' }],

      [{ align: [] }],

      ['link', 'image'],

      ['clean'],
    ],
  };

  public onContentChanged(event: ContentChange): void{
    this.addPostForm.content().value.set(event.html ?? '');
  }

  // DONE
  private getPosts(): void {
    this.loaderService.setLoading(true);
    this.postsService.getPosts({page: 0, size: 10}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((posts: IPostDTO) => {
      this.posts.set(posts.content);
      this.loaderService.setLoading(false);
    })
  }

  // DONE
  private getCategories(): void {
    this.categoryService.getCategories().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((categories: ICategory[]) => {
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
    this.addPostForm.categoryId().value.set(this.selectedCategory()!.id);
    if (this.addPostForm().invalid()) {
      console.log(this.addPostForm().value())
      return;
    }
    this.isShownStatusPopup.set(true);
  }

  protected createPost(): void {

    const dataToSend: ICreatePost = {
      ...this.addPostForm().value(),
      categoryId: this.selectedCategory()!.id,
      featured: this.isFeatured(),
      status: this.selectedStatus()
    };

  }


}


export interface PostModel{
  title: string,
  caption: string,
  description: string,
  categoryId: number | null,
  content: string,
  coverImgUrl: string,
  featured: boolean | null,
  status: StatusType | null,
}
