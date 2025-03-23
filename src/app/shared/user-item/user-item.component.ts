import { Component, input } from '@angular/core';
import { User } from '../../core/types/user.type';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-user-item',
  imports: [RouterLink, ButtonComponent],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css'
})
export class UserItemComponent {
  user = input.required<User>()

  constructor() { }

}
