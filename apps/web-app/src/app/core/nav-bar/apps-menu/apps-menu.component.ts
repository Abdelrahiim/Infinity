import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { dropDownAnimation } from '../../../shared/animations/dropdown-menu.animation';

@Component({
  selector: 'app-apps-menu',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './apps-menu.component.html',
  styleUrl: './apps-menu.component.css',
  animations: [dropDownAnimation()],
})
export class AppsMenuComponent {
  isOpen = signal<boolean>(false);

  toggle() {
    this.isOpen.update((value) => !value);
  }

  closeMenu() {
    this.isOpen.set(false);
  }
}
