import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { IPostDetailDTO, PostsService } from '../../../services/posts-service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-single-post',
  imports: [],
  templateUrl: './single-post.html',
  styleUrl: './single-post.css',
})
export class SinglePost implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  protected post = signal<IPostDetailDTO | null>(null)
  private slug = signal<string>('');

  ngOnInit(): void {
    this.activeRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const slug = params.get('slug');

      if (!slug) {
        return;
      }

      this.slug.set(slug);
    })
    this.postsService.getPostBySlug(this.slug()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.post.set(res);
      }
    })
  }
}
