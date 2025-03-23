import { NgClass, NgIf } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass, NgIf],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  type = input<'primary' | 'secondary' | 'accent' | 'error'>('primary'); 
  disabled = input<boolean>(false); 
  leadingIcon = input<string | null>(null);
  trailingIcon = input<string | null>(null);
}
