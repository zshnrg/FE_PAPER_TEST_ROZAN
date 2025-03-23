import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { UserService } from '../../core/services/user/user.service';
import { DebugElement } from '@angular/core';
import { User } from '../../core/types/user.type';
import { USERS } from '../user-list/user.mock';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let el: DebugElement

  const mockUser: User = USERS[0];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUser']);
    userServiceSpy.getUser.and.callFake(() => of(mockUser)); 

    await TestBed.configureTestingModule({
      imports: [UserDetailComponent],
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
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user when data is loaded', () => {
    userService.getUser.and.returnValue(of(mockUser));
    fixture.detectChanges();

    expect(component.loading()).toBeFalse();
    expect(component.user()).toEqual(mockUser);

    expect((component.user() as User).name).toBe(mockUser.name);
    expect((component.user() as User).email).toBe(mockUser.email);
    expect((component.user() as User).phone).toBe(mockUser.phone);
    expect((component.user() as User).website).toBe(mockUser.website);
    expect((component.user() as User).address).toEqual(mockUser.address);
    expect((component.user() as User).company).toEqual(mockUser.company);
  });

  it('should display "User not found" when API returns an empty user', () => {
    userService.getUser.and.returnValue(of({}));
    fixture.detectChanges();

    
    expect(component.loading()).toBeFalse();
    expect(component.user()).toBeNull();

    const emptyMessage = el.query(By.css('.error'));
    expect(emptyMessage.nativeElement.textContent).toContain('User not found');
  });

  it('should handle API errors gracefully', () => {
    spyOn(console, 'error');
    userService.getUser.and.returnValue(throwError(() => new Error('API Error')));
    fixture.detectChanges();

    expect(component.loading()).toBeFalse();
    expect(component.user()).toBeNull();
    expect(console.error).toHaveBeenCalled();
  });
});
