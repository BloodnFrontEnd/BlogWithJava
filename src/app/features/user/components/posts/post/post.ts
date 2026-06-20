import {Component, inject, input} from '@angular/core';
import {NgClass} from '@angular/common';
import {IPostSumDTO} from '../../../services/posts-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [
    NgClass
  ],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post {
  private readonly router = inject(Router);
  public readonly post = input.required<IPostSumDTO>();

  protected navigateToPost(post: IPostSumDTO){
    this.router.navigate([`/posts/${post.slug}`]);
  }
}
