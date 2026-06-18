import {Component, DestroyRef, inject, signal} from '@angular/core';
import {CustomInput} from '../../../shared/custom-input/custom-input';
import {form} from '@angular/forms/signals';
import {AuthService} from '../auth-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {setToken} from '../../../core/token-object/token-object';

@Component({
  selector: 'app-login',
  imports: [
    CustomInput
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService)
  private readonly destroyRef = inject(DestroyRef)

  public loginModel = signal<{ email: string, password: string }>({
    email: '',
    password: ''
  })

  public loginForm = form(this.loginModel);

  protected signin(): void {
    this.authService.login(this.loginForm().value()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (resp) => {
        console.log('logged in successfully');

        setToken(resp);
      }
    })
  }
}
