import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { IPostDetailDTO, PostsService } from '../../../services/posts-service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {ContentChange, QuillEditorComponent} from 'ngx-quill';
import {LoaderService} from '../../../../../core/loader/loader-service';

@Component({
  selector: 'app-single-post',
  imports: [
    QuillEditorComponent
  ],
  templateUrl: './single-post.html',
  styleUrl: './single-post.css',
})
export class SinglePost implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly loaderService = inject(LoaderService);

  protected post = signal<IPostDetailDTO | null>(null)
  private slug = signal<string>('');

  public contet = signal<string>('');

  ngOnInit(): void {
    this.activeRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const slug = params.get('slug');

      if (!slug) {
        return;
      }

      this.slug.set(slug);
    })

    this.loaderService.setLoading(true);
    this.postsService.getPostBySlug(this.slug()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        console.log(res);
        this.loaderService.setLoading(false);
        this.post.set(res);
      }
    })
  }

  public onContentChanged(event: ContentChange): void {
    this.contet.set(event.html ?? '');
    console.log(this.contet());
  }

}
