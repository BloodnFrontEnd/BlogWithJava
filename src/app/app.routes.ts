import {Routes} from '@angular/router';
import {Home} from './features/user/pages/home/home';
import {PostsPage} from './features/user/pages/posts-page/posts-page';
import {Registration} from './features/auth/registration/registration';
import {Login} from './features/auth/login/login';
import { SinglePost } from './features/user/pages/posts-page/single-post/single-post';
import {Profile} from './features/user/pages/profile/profile';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: Home},
  {path: 'posts', component: PostsPage},
  {path: 'posts/:slug', component: SinglePost},
  {path: ':profile', component: Profile},
  {
    path: 'auth', children: [
      {path: 'registration', component: Registration},
      {path: 'login', component: Login}
    ]
  }
];
