import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly API = 'https://cms-blog-backend-ci8n.onrender.com/api/categories';

  public getCategories(): Observable<ICategory[]>{
    return this.http.get<ICategory[]>(`${this.API}`);
  }
}

export interface ICategory{
  id: number,
  name: string,
  slug: string,
}
