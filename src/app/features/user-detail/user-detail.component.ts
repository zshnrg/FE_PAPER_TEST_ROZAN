import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { User } from '../../core/types/user.type';
import { ButtonComponent } from '../../shared/button/button.component';
import { MapComponent } from '../../shared/map/map.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-user-detail',
  imports: [ButtonComponent, RouterLink, MapComponent, NgxSkeletonLoaderModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {

  user = signal<User | null>(null);
  loading = signal(true);

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];

    this.userService.getUser(id)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe((user) => {
        this.user.set(user);
        this.loading.set(false);
      });
  }
}
