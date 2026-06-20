import {Component, DestroyRef, inject, OnInit, Signal, signal} from '@angular/core';
import {IPostSumDTO, PostsService, StatusType} from '../../services/posts-service';
import {NgClass} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LoaderService} from '../../../../core/loader/loader-service';
import {Posts} from '../../components/posts/posts';

@Component({
  selector: 'app-profile',
  imports: [
    NgClass,
    Posts
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly postsService = inject(PostsService);
  private readonly loaderService = inject(LoaderService);

  protected contentType = signal<string>('myPosts');
  protected readonly postStatuses: StatusType[] = ["PUBLISHED", "PRIVATE", "DRAFT", "ARCHIVED"]
  protected selectedPostStatus = signal<StatusType>('PUBLISHED')

  protected readonly posts = signal<IPostSumDTO[]>([]);

  ngOnInit() {
    if(this.contentType() === 'myPosts') {
      this.getPosts();
    }
  }

  protected setContentType(contentType: string): void {
    this.contentType.set(contentType);
  }

  protected setPostStatus(postStatus: StatusType): void {
    this.selectedPostStatus.set(postStatus);
    this.getPosts();
  }

  protected getPosts(): void{
    this.loaderService.setLoading(true);
    this.postsService.getPostsByProfileAndStatus(this.selectedPostStatus()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.posts.set(res.content);
        this.loaderService.setLoading(false);
      }
    })
  }
}
