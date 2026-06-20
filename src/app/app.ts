import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from './features/user/layout/header/header';
import {Growl} from './core/growl/growl';
import {LayoutService} from './features/user/layout/layout-service';
import {NgClass} from '@angular/common';
import {AuthService} from './features/auth/auth-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {setToken} from './core/token-object/token-object';
import {Loader} from './core/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Growl, NgClass, Loader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly layoutService = inject(LayoutService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);

  ngOnInit() {
    setInterval(() => {
      const refreshToken = sessionStorage.getItem('refreshToken');
      if (refreshToken != null) {
        this.authService.refresh(refreshToken).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: (resp) => {
            setToken(resp);
          }
        })
      }
    }, 720000)
  }
}
