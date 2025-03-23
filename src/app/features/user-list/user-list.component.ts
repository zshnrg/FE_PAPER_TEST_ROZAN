import { Component, signal } from '@angular/core';
import { USERS } from './user.mock';
import { UserItemComponent } from '../../shared/user-item/user-item.component';

@Component({
  selector: 'app-user-list',
  imports: [UserItemComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  title = signal("User List")
  users = signal(USERS)
}
