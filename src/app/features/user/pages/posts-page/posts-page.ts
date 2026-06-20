import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { CategoryService, ICategory } from '../../services/category-service';
import { IPostDTO, IPostSumDTO, PostsService } from '../../services/posts-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Posts } from '../../components/posts/posts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-page',
  imports: [
    NgClass,
    Posts
  ],
  templateUrl: './posts-page.html',
  styleUrl: './posts-page.css',
})
export class PostsPage implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  private readonly categoriesService = inject(CategoryService);
  private readonly postsService = inject(PostsService);
  private readonly router = inject(Router);

  protected categories = signal<ICategory[]>([{ id: -1, name: 'all', slug: 'all' }]);
  protected selectedCategory = signal<ICategory | null>({ id: -1, name: 'all', slug: 'all' });
  protected posts = signal<IPostSumDTO[]>([]);

  ngOnInit(): void {
    this.categoriesService.getCategories().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.categories.update((val) => [...(val ?? []), ...res]);
      }
    })

    this.getPosts();
  }

  protected getPosts(): void {
    this.postsService.getPosts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.posts.set(res.content);
      }
    })
  }


  protected changeCategory(category: ICategory): void {
    if (this.selectedCategory()?.id === category.id) {
      return;
    }
    if (category.id === -1) {
      this.selectedCategory.set(category);
      this.getPosts();
      return;
    }
    this.selectedCategory.set(category);
    this.postsService.getPostsByCategorySlug(category.slug).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.posts.set(res.content);
      }
    })
  }

  protected navigateToPost(post: IPostSumDTO){
    this.router.navigate([`/posts/${post.slug}`]);
  }
}
