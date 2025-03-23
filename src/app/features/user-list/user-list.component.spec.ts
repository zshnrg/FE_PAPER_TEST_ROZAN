import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { DebugElement } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { User } from '../../core/types/user.type';
import { USERS } from './user.mock';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let el: DebugElement;

  const mockUsers: User[] = USERS

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    userServiceSpy.getUsers.and.callFake(() => of(mockUsers));

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        {
          provide: UserService, 
          useValue: userServiceSpy
        },
        {
          provide: ActivatedRoute, 
          useValue: { snapshot: { params: { id: 1 } } } 
        }
      ]
    })
      .compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display users when data is loaded', () => {
    userService.getUsers.and.returnValue(of(mockUsers));
    fixture.detectChanges();

    expect(component.users().length).toBe(2);
    fixture.detectChanges();

    const userItems = el.queryAll(By.css('app-user-item'));
    expect(userItems.length).toBe(2);
  });

  it('should display "No users found" when API returns an empty array', () => {
    userService.getUsers.and.returnValue(of([]));
    fixture.detectChanges();

    const emptyMessage = el.query(By.css('.empty'));
    expect(emptyMessage.nativeElement.textContent).toContain('No users found');
  });

  it('should handle API errors gracefully', () => {
    spyOn(console, 'error');
    userService.getUsers.and.returnValue(throwError(() => new Error('API Error')));
    fixture.detectChanges();

    expect(component.users().length).toBe(0);
    expect(console.error).toHaveBeenCalled();
  });
});
