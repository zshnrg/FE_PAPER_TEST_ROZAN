import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './features/user-list/user-list.component';
import { UserDetailComponent } from './features/user-detail/user-detail.component';

export const routes: Routes = [
    {
        path: "",
        pathMatch: 'full',
        component: UserListComponent
    },
    {
        path: "users/:id",
        component: UserDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }