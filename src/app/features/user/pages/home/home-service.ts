import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly http = inject(HttpClient);
  private readonly API = "https://cms-blog-backend-ci8n.onrender.com/api"

  public getPosts(): Observable<any> {
    return this.http.get(`${this.API}/posts`);
  }

  public getCategories(): Observable<any> {
    return this.http.get(`${this.API}/categories`);
  }

  public createPost(data: any): Observable<any>{
    return this.http.post(`${this.API}/posts`, data);
  }
}
