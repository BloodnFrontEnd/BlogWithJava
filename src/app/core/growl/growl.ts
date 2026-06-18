import {Component, inject} from '@angular/core';
import {GrowlService} from './growl-service';

@Component({
  selector: 'app-growl',
  imports: [],
  templateUrl: './growl.html',
  styleUrl: './growl.css',
})
export class Growl {
  public growlService = inject(GrowlService);
}
