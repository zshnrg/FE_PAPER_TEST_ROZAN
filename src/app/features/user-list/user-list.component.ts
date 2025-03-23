import { Component, signal } from '@angular/core';
import { USERS } from './user.mock';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  title = signal("User List")
  users = signal(USERS)
}
