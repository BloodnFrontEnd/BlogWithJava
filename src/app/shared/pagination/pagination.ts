import {Component, computed, input, OnInit, output, signal} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [
    NgClass
  ],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  public paginatorData = input.required<IPaginator>();
  public selectedPage = output<number>();

  protected readonly pageCount = computed(() => {
    const totalPages = this.paginatorData().totalPages;

    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  });

  protected currentPage = signal<number>(1);

  protected selectCurrentPage(page: number){
    this.currentPage.set(page);
    this.selectedPage.emit(page - 1);
  }

  protected nextPage(): void{
    if(this.currentPage() < this.paginatorData().totalPages){
      this.selectCurrentPage(this.currentPage() + 1);
    }
  }

  protected prevPage(): void{
    if(this.currentPage() !== 1){
      this.selectCurrentPage(this.currentPage() - 1);
    }
  }

}

export interface IPaginator{
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
