import { Routes } from '@angular/router';
import { UserListComponent } from './features/user-list/user-list.component';

export const routes: Routes = [
    {
        path: "",
        pathMatch: 'full',
        component: UserListComponent
    }
];
