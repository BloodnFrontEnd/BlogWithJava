import {Component, DestroyRef, inject, OnInit, Signal, signal} from '@angular/core';
import {IPostSumDTO, PostsService, StatusType} from '../../services/posts-service';
import {NgClass} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LoaderService} from '../../../../core/loader/loader-service';
import {Posts} from '../../components/posts/posts';
import {IPaginator, Pagination} from '../../../../shared/pagination/pagination';
import {ObjectHelper} from '../../../../core/models/Object-Helper';

@Component({
  selector: 'app-profile',
  imports: [
    NgClass,
    Posts,
    Pagination
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
  protected paginatorData = signal<IPaginator | null>(null);

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

  protected getPosts(page?: number): void{
    const paginationData = {
      status: this.selectedPostStatus(),
      size: 100,
      page: page ?? null,
    }
    ObjectHelper.clearObject(paginationData);
    this.loaderService.setLoading(true);
    this.postsService.getPostsByProfileAndStatus(paginationData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.posts.set(res.content);
        this.loaderService.setLoading(false);
        const paginatorData: IPaginator = {size: res.size, page: res.page, totalPages: res.totalPages, totalElements: res.totalElements};
        this.paginatorData.set(paginatorData);
      }
    })
  }

}
