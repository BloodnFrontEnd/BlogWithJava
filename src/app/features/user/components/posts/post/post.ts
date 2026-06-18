import {Component, input} from '@angular/core';
import {IPostSummery} from '../../../pages/home/home';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-post',
  imports: [
    NgClass
  ],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post {
  public readonly post = input.required<IPostSummery>();
}
