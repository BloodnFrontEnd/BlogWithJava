import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isLoading = signal<boolean>(false);

  public setLoading(value: true | false): void {
    this.isLoading.set(value);
  }
}
