import {Component, signal} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-posts-page',
  imports: [
    NgClass
  ],
  templateUrl: './posts-page.html',
  styleUrl: './posts-page.css',
})
export class PostsPage {
  protected readonly categories = ["all", "Technology", "Travel", "Business", "Design", "Health", "Food", "Coding", "Lifestyle", "Finance", "Host"]
  protected selectedCategory = signal<string>("all");

  protected changeCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
