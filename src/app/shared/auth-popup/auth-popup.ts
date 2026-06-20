import {Component, DestroyRef, inject, output, signal} from '@angular/core';
import {Popup} from '../popup/popup';
import {CustomInput} from '../custom-input/custom-input';
import {email, form, minLength, required, validate} from '@angular/forms/signals';
import {ICreateUser} from '../../features/auth/registration/registration';
import {Validators} from '@angular/forms';
import {AuthService, ILogin} from '../../features/auth/auth-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {setToken} from '../../core/token-object/token-object';
import {GrowlService} from '../../core/growl/growl-service';
import {ObjectHelper} from '../../core/models/Object-Helper';
import {LoaderService} from '../../core/loader/loader-service';

@Component({
  selector: 'app-auth-popup',
  imports: [
    Popup,
    CustomInput
  ],
  templateUrl: './auth-popup.html',
  styleUrl: './auth-popup.css',
})
export class AuthPopup {
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  private readonly growl = inject(GrowlService)
  private readonly loaderService = inject(LoaderService);

  protected type = signal<'sign in' | 'sign up'>('sign in');
  public close = output();

  protected loginModel = signal<ILogin>(
    {
      email: '',
      password: ''
    }
  )

  protected registrationModel = signal<ICreateUserModel>(
    {
      username: '',
      email: '',
      password: '',
      displayName: '',
      passwordRep: '',
    }
  )

  protected registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.email, {message: "Email is required"});
    email(schemaPath.email, {message: "Email must be a valid email"});
    required(schemaPath.username, {message: "Username is required"});
    minLength(schemaPath.username, 3, {message: "Username min length is 3"});
    required(schemaPath.displayName, {message: "Display name is required"});
    minLength(schemaPath.displayName, 3, {message: "Display name's min length is 3"});
    required(schemaPath.password, {message: "Password is required"});
    minLength(schemaPath.password, 6, {message: "Password must be at least 6 characters"});
    required(schemaPath.passwordRep, {message: "PasswordRep is required"});
    validate(schemaPath.passwordRep, ({value, valueOf}) => {
      const passwordRep = value();
      const password = valueOf(schemaPath.password);

      if (passwordRep !== password) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match',
        };
      }

      return null;
    });
  });

  protected loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, {message: "Email is required"});
    email(schemaPath.email, {message: "Email must contain @"});
    required(schemaPath.password, {message: "Password is required"});
    minLength(schemaPath.password, 6, {message: "Password must be at least 6 characters"});
  });


  protected changeType(): void {
    this.type.update(value => value === 'sign in' ? 'sign up' : 'sign in');
  }

  protected getFieldErrors(field: any) {
    const control = field();
    return control.touched() || control.dirty() ? control.errors() : null;
  }

  protected onSubmit(): void {
    if (this.type() === 'sign in') {

      if (!this.loginForm().valid()) {
        return;
      }

      this.loaderService.setLoading(true);

      const dataToSend = {...this.loginForm().value()};

      this.authService.login(dataToSend).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (resp) => {
          setToken(resp);
          this.growl.success("You are logined successfully.");
          this.loginForm().reset();
          this.loginModel.set({
            email: '',
            password: ''
          })
          this.authService.setIsAuthorized(true);
          this.close.emit()
          this.loaderService.setLoading(false);
        }, error: (error) => {
          console.log(error);
          this.growl.error(error.error.message);
        }
      })

    } else {
      if(!this.registrationForm().valid()) {
        return;
      }
      this.loaderService.setLoading(true);
      const dataToSend = {...this.registrationForm().value(), passwordRep: null};
      ObjectHelper.clearObject(dataToSend);

      this.authService.createUser(dataToSend).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (resp) => {
          setToken(resp);
          this.growl.success("You are created successfully.");
          this.registrationForm().reset();
          this.registrationModel.set({
            username: '',
            email: '',
            password: '',
            displayName: '',
            passwordRep: '',
          });
          this.authService.setIsAuthorized(true);
          this.close.emit()
          this.loaderService.setLoading(false);
        }, error: (error) => {
          this.growl.error(error.error.message);
        }
      })
    }
  }
}


export interface ICreateUserModel {
  username: string,
  email: string,
  displayName: string,
  password: string,
  passwordRep: string;
}
