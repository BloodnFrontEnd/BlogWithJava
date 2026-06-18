import {inject, Injectable, signal} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly hideRoutes = ['/auth/registration', '/auth/login'];
  private readonly router = inject(Router);

  public showLayout = signal<boolean>(true)

  constructor() {
    this.checkRoute(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.checkRoute(event.urlAfterRedirects);
      });
  }

  private checkRoute(url: string): void {
    const cleanUrl = url.split('?')[0];

    this.showLayout.set(!this.hideRoutes.includes(cleanUrl));
  }
}
