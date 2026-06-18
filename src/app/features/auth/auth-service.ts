import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly API = 'https://cms-blog-backend-ci8n.onrender.com/api/auth'

  public createUser(data: IRegister): Observable<any> {
    return this.http.post(`${this.API}/register`, data);
  }

  public login(data: ILogin): Observable<any> {
    return this.http.post(`${this.API}/login`, data);
  }

  public refresh(token: string): Observable<any> {
    return this.http.post(`${this.API}/refresh`, {'refreshToken': token});
  }

  public logOut(token: string): Observable<any> {
    return this.http.post(`${this.API}/logout`, {'refreshToken': token});
  }
}

export interface ITokenDTO {
  "accessToken": string,
  "refreshToken": string,
  "username": string,
  "displayName": string,
  "role": string
}

export interface ILogin {
  "email": string
  "password": string
}

export interface IRegister {
  "username": string,
  "email": string,
  "password": string,
  "displayName": string
}

