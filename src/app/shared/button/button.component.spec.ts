import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply correct button type class', () => {
    fixture.componentRef.setInput('type', 'primary');
    fixture.detectChanges();
    
    expect(el.query(By.css('button')).nativeElement.classList).toContain('primary');
  });

  it('should disable button when disabled() returns true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    
    const button = el.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeTrue();
  });

  it('should enable button when disabled() returns false', () => {
    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();

    const button = el.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeFalse();
  });

  it('should display leading icon when set', () => {
    fixture.componentRef.setInput('leadingIcon', 'home');
    fixture.detectChanges();

    const icon = el.query(By.css('.icon'));
    expect(icon).toBeTruthy();
    expect(icon.nativeElement.textContent.trim()).toBe('home');
  });

  it('should not display leading icon when null', () => {
    fixture.componentRef.setInput('leadingIcon', null);
    fixture.detectChanges();

    const icon = el.query(By.css('.icon'));
    expect(icon).toBeNull();
  });

  it('should display trailing icon when set', () => {
    fixture.componentRef.setInput('trailingIcon', 'arrow_forward');
    fixture.detectChanges();

    const icons = el.queryAll(By.css('.icon'));
    expect(icons.length).toBe(1);
    expect(icons[0].nativeElement.textContent.trim()).toBe('arrow_forward');
  });

  it('should support both leading and trailing icons', () => {
    fixture.componentRef.setInput('leadingIcon', 'menu');
    fixture.componentRef.setInput('trailingIcon', 'arrow_forward');
    fixture.detectChanges();

    const icons = el.queryAll(By.css('.icon'));
    expect(icons.length).toBe(2);
    expect(icons[0].nativeElement.textContent.trim()).toBe('menu');
    expect(icons[1].nativeElement.textContent.trim()).toBe('arrow_forward');
  });

  it('should render content inside the button', () => {
    const buttonElement = el.query(By.css('button')).nativeElement;
    buttonElement.innerHTML = 'Click Me';
    fixture.detectChanges();

    expect(buttonElement.textContent).toContain('Click Me');
  });
});
