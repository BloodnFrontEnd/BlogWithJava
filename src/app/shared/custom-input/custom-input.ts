import {Component, computed, input} from '@angular/core';
import {FormField} from '@angular/forms/signals';

@Component({
  selector: 'custom-input',
  imports: [
    FormField
  ],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.css',
})
export class CustomInput {
  public label = input.required<string>();
  public field = input.required<any>();
  public errors = input<any>();
}
