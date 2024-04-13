import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'friends',
    pathMatch: 'full',
    loadComponent: () => import('./components/list-friend-page/list-friend-page.component').then(c => c.ListFriendPageComponent)
  },
  {
    path: 'friends/update/:id',
    loadComponent: () => import('./components/update-friend-page/update-friend-page.component').then(c => c.UpdateFriendPageComponent)
  },
  {
    path: '**',
    redirectTo: 'friends'
  }
];
