import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { dropDownAnimation } from '../../../shared/animations/dropdown-menu.animation';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css',
  animations: [dropDownAnimation()],
})
export class UserMenuComponent {
  userMenuOpen = signal<boolean>(false);

  toggleUserMenu() {
    this.userMenuOpen.update((value) => !value);
  }

  closeUserMenu() {
    this.userMenuOpen.set(false);
  }
}
