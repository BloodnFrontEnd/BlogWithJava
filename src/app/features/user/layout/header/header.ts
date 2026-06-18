import {Component, HostListener, inject, OnInit, signal} from '@angular/core';
import {RadioButton} from '../../../../shared/radio-button/radio-button';
import {AuthService} from '../../../auth/auth-service';

@Component({
  selector: 'app-header',
  imports: [
    RadioButton
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private readonly authService = inject(AuthService);

  protected isMobileShown = signal<boolean>(false);
  protected isLogined = signal<boolean>(false);

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth >= 992) {
      this.isMobileShown.set(false);
    }
  }

  public showMobileMenu(): void {
    this.isMobileShown.update((value) => !value);
  }

  protected logOut(): void {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      this.authService.logOut(refreshToken).pipe().subscribe(() => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('displayName');
        sessionStorage.removeItem('role');
      });
    }
  }

  ngOnInit(): void {
    const refreshToken = sessionStorage.getItem('refreshToken') ?? null;
    console.log(refreshToken);
    if (refreshToken !== null) {
      this.isLogined.set(true);
    } else {
      this.isLogined.set(false);
    }
  }
}
