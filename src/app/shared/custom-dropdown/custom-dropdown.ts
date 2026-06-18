import {Component, input, output, signal} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'custom-dropdown',
  imports: [
    NgClass
  ],
  templateUrl: './custom-dropdown.html',
  styleUrl: './custom-dropdown.css',
})
export class CustomDropdown {
  public dropdownItems = input.required<DropdownData[]>();
  protected isShownData = signal<boolean>(false);
  protected selectedValue = signal<DropdownData | null>(null);

  public selectedValues = output<DropdownData>();

  protected showData():void{
    this.isShownData.update(value => !value);
  }

  protected selectValue(data: any):void{
    this.selectedValue.set(data);
    this.selectedValues.emit(data);
    this.isShownData.set(false);
  }
}

export interface DropdownData{
  id: number,
  value: string,
}
