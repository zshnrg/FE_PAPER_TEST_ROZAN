import { Component, inject, signal } from '@angular/core';
import { UserItemComponent } from '../../shared/user-item/user-item.component';
import { User } from '../../core/types/user.type';
import { UserService } from '../../core/services/user/user.service';
import { catchError, of } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-user-list',
  imports: [NgxSkeletonLoaderModule, UserItemComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  users = signal<User[]>([])
  loading = signal(true)

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers()
      .pipe(
        catchError((error) => {
          console.error(error);
          return of([]);
        })
      )
      .subscribe((users) => {
        this.users.set(users);
        this.loading.set(false);
      });
  }
}
