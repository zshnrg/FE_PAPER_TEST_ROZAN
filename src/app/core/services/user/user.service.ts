import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  
  getUsers() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    return this.http.get<Array<User>>(url);
  }

  getUser(id: number) {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    return this.http.get<User>(url);
  }
}
