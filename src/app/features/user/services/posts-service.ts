import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICategory} from './category-service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly http = inject(HttpClient);
  private readonly API = 'https://cms-blog-backend-ci8n.onrender.com/api/posts'

  public getPosts(params?: IPostParams): Observable<IPostDTO> {
    return this.http.get<IPostDTO>(this.API, {params: {...params}});
  }

  public getPostsByCategorySlug(slug: string): Observable<IPostDTO>{
    return this.http.get<IPostDTO>(`${this.API}/category/${slug}`);
  }

  public getPostBySlug(slug: string): Observable<IPostDetailDTO>{
    return this.http.get<IPostDetailDTO>(`${this.API}/${slug}`);
  }

  public createPost(data: ICreatePost): Observable<any> {
    return this.http.post(this.API, data);
  }

}

export interface IPostParams {
  page: number;
  size: number;
  sortBy?: string;
}

export interface IPostSumDTO {
  id: number,
  title: string,
  slug: string,
  caption: string,
  coverImgUrl: string,
  featured: boolean,
  status: StatusType;
  publishedAt: string;
  category: ICategory;
  author: IAuthor,
}

export interface IPostDTO {
  content: IPostSumDTO[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export type StatusType = "DRAFT" | "PRIVATE" | "PUBLISHED" | "ARCHIVED";

export interface IAuthor {
  id: number,
  username: string,
  displayName: string,
  avatarUrl: string,
  bio: string
}

export interface ICreatePost {
  "title": string,
  "caption": string,
  "content": string,
  "coverImgUrl": string,
  "featured": boolean,
  "categoryId": number,
  "status": StatusType,
}

export interface IPostDetailDTO {
  id: number;
  title: string;
  slug: string;
  caption: string;
  content: string;
  coverImgUrl: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status: StatusType,
  author: IAuthor,
  category: ICategory,
}