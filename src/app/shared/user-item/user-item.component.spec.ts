import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemComponent } from './user-item.component';
import { User } from '../../core/types/user.type';
import { USERS } from '../../features/user-list/user.mock';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { By } from '@angular/platform-browser';

describe('UserItemComponent', () => {
  let component: UserItemComponent;
  let fixture: ComponentFixture<UserItemComponent>;

  const mockUser: User = USERS[0]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserItemComponent, ButtonComponent],
      providers: [
        provideRouter([])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', mockUser);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the user name and username', () => {
    const nameElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    const usernameElement = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(nameElement.textContent).toContain(mockUser.name);
    expect(usernameElement.textContent).toContain('@' + mockUser.username);
  });

  it('should have the correct routerLink on the main div', () => {
    const divElement = fixture.debugElement.query(By.css('div'));
    expect(divElement.attributes['ng-reflect-router-link']).toBe(`/users,${mockUser.id}`);
  });

  it('should have the correct routerLink on the button', () => {
    const buttonElement = fixture.debugElement.query(By.css('app-button'));
    expect(buttonElement.attributes['ng-reflect-router-link']).toBe(`/users,${mockUser.id}`);
  });

  it('should render the app-button component', () => {
    const buttonElement = fixture.debugElement.query(By.css('app-button'));
    expect(buttonElement).toBeTruthy();
  });
});