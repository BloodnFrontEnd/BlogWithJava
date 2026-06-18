import {Component, input} from '@angular/core';
import {Post,} from './post/post';
import {IPostSummery} from '../../pages/home/home';

@Component({
  selector: 'app-posts',
  imports: [
    Post
  ],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {

  public posts = input.required<IPostSummery[]>();
}

