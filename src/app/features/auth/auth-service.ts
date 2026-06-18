import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICreateUser} from './registration/registration';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly API = 'https://cms-blog-backend-ci8n.onrender.com/api/auth'

  public createUser(data: ICreateUser): Observable<any>{
    return this.http.post(`${this.API}/register`, data);
  }

  public login(data: any): Observable<any> {
    return this.http.post(`${this.API}/login`, data);
  }

  public refresh(token: string):Observable<any> {
    return this.http.post(`${this.API}/refresh`, {'refreshToken': token});
  }

  public logOut(token: string): Observable<any> {
    return this.http.post(`${this.API}/logout`, {'refreshToken': token});
  }
}
