import {Component, input} from '@angular/core';
import {NgClass} from '@angular/common';
import {IPostSumDTO} from '../../../services/posts-service';

@Component({
  selector: 'app-post',
  imports: [
    NgClass
  ],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post {
  public readonly post = input.required<IPostSumDTO>();
}
