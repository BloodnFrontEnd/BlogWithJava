import {Component, input} from '@angular/core';
import {Post,} from './post/post';
import {IPostSumDTO} from '../../services/posts-service';

@Component({
  selector: 'app-posts',
  imports: [
    Post
  ],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {

  public posts = input.required<IPostSumDTO[]>();
}

