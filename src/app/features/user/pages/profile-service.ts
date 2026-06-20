import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Profile} from './profile/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly API = 'https://cms-blog-backend-ci8n.onrender.com/api/users'

  public getProfile(): Observable<any>{
    return this.http.get(this.API);
  }
}
