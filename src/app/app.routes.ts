import {Routes} from '@angular/router';
import {Home} from './features/user/pages/home/home';
import {PostsPage} from './features/user/pages/posts-page/posts-page';
import {Registration} from './features/auth/registration/registration';
import {Login} from './features/auth/login/login';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: Home},
  {path: 'posts', component: PostsPage},
  {
    path: 'auth', children: [
      {path: 'registration', component: Registration},
      {path: 'login', component: Login}
    ]
  }
];
