import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-comments',
  imports: [CommonModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments {

  protected readonly comments = signal<any>([
    {
      id: 1,
      comment: 'something\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\nsomething\n',
      isShowMore: false,
    },
    {
      id: 2,
      comment: 'something 2',
      isShowMore: false,
    },
  ])

  protected showMore(id: number): void {
    this.comments.update(comments => comments.map((comment: any) => comment.id === id ? {...comment, isShowMore: !comment.isShowMore} : comment));
    console.log(this.comments());
  }
}
