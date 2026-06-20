import {Component, HostListener, inject, OnInit, signal} from '@angular/core';
import {RadioButton} from '../../../../shared/radio-button/radio-button';
import {AuthService} from '../../../auth/auth-service';
import { CommonModule } from '@angular/common';
import { LucideUser, LucideDynamicIcon } from '@lucide/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RadioButton,
    CommonModule,
    LucideDynamicIcon,
    RouterLink
],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private readonly authService = inject(AuthService);
  protected readonly userIcon = signal(LucideUser)

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
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (refreshToken) {
      this.authService.logOut(refreshToken).pipe().subscribe(() => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('displayName');
        sessionStorage.removeItem('role');
        this.isLogined.set(false);
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
