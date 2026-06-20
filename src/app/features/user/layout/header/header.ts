import {Component, computed, HostListener, inject, OnInit, signal} from '@angular/core';
import {RadioButton} from '../../../../shared/radio-button/radio-button';
import {AuthService} from '../../../auth/auth-service';
import { CommonModule } from '@angular/common';
import { LucideUser, LucideDynamicIcon } from '@lucide/angular';
import { RouterLink } from '@angular/router';
import {LoaderService} from '../../../../core/loader/loader-service';

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
  private readonly loaderService = inject(LoaderService);

  protected readonly userIcon = signal(LucideUser)
  protected isAuthorized = computed(() => this.authService.isAuthorized());
  protected username = computed(() => this.authService.username());

  protected isMobileShown = signal<boolean>(false);

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth >= 992) {
      this.isMobileShown.set(false);
    }
  }

  ngOnInit() {
    console.log(this.isAuthorized());
  }

  public showMobileMenu(): void {
    this.isMobileShown.update((value) => !value);
  }

  protected logOut(): void {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (refreshToken) {
      this.loaderService.setLoading(true);
      this.authService.logOut(refreshToken).pipe().subscribe(() => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('displayName');
        sessionStorage.removeItem('role');
        this.loaderService.setLoading(false);
        this.authService.setIsAuthorized(false);
      });
    }
  }
}
