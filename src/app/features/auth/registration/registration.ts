import {Component, DestroyRef, inject, signal} from '@angular/core';
import {AuthService} from '../auth-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {email, form, FormField, minLength, required} from '@angular/forms/signals';
import {GrowlService} from '../../../core/growl/growl-service';
import {Router} from '@angular/router';
import {setToken} from '../../../core/token-object/token-object';

@Component({
  selector: 'app-registration',
  imports: [
    FormField,
  ],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})


export class Registration {
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef)
  private readonly growlService = inject(GrowlService);
  private readonly router = inject(Router);

  registrationModel = signal<ICreateUser>(
    {
      username: '',
      email: '',
      password: '',
      displayName: '',
    }
  )

  registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.email, {message: "Email is required"});
    email(schemaPath.email, {message: "Email must be a valid email"});
    required(schemaPath.username, {message: "Username is required"});
    minLength(schemaPath.username, 3, {message: "Username min length is 3"});
    required(schemaPath.displayName, {message: "Display name is required"});
    minLength(schemaPath.displayName, 3, {message: "Display name's min length is 3"});
    required(schemaPath.password, {message: "Password is required"});
    minLength(schemaPath.password, 6, {message: "Password must be at least 6 characters"});
  });


  protected createUser(): void {
    event?.preventDefault();
    if(this.registrationForm().invalid()) {
      return;
    }
    console.log("Create user");
    console.log(this.registrationForm().value());

    const dataToSend = {...this.registrationForm().value()};

    this.authService.createUser(dataToSend).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (resp: ICreateUserResponse) => {
        console.log(resp);
        this.registrationModel.set({
          username: '',
          email: '',
          password: '',
          displayName: '',
        })
        this.registrationForm().reset();

        setToken(resp);


        this.growlService.success("you are successfully registered");
        this.router.navigate(['/']);
      }, error: (error: any) => {
        this.growlService.error(error.error.message);
      }
    });
  }
}


export interface ICreateUser {
  username: string,
  email: string,
  displayName: string,
  password: string,
}

export interface ICreateUserResponse {
  accessToken: "string",
  refreshToken: "string",
  username: "string",
  displayName: "string",
  role: "string"
}
