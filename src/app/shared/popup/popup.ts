import {Component, DOCUMENT, inject, input, OnDestroy, OnInit, output} from '@angular/core';

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class Popup implements OnInit , OnDestroy{
  private readonly document = inject(DOCUMENT);

  public title = input.required<string>();

  public close = output<void>();

  ngOnInit() {
    this.document.body.classList.add('overflow-hidden');
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('overflow-hidden');
  }

}
