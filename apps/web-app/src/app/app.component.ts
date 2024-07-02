import { Component, signal, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { SideBarComponent } from './core/side-bar/side-bar.component';
import { OpenSideBarService } from './core/services/open-side-bar.service';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './shared/directives/click-outside.directive';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  standalone: true,
  imports: [
    NavBarComponent,
    RouterModule,
    SideBarComponent,
    CommonModule,
    ClickOutsideDirective,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('sideNavOpen', [
      transition(':enter', [
        style({ opacity: 0, translateX: '-100%' }),
        animate('150ms ease-in-out', style({ opacity: 1, translateX: '0' })),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in-out',
          style({ opacity: 0, translateX: '-100%' })
        ),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  openSideNav = signal(false);
  constructor(private sideNavBarService: OpenSideBarService) {}

  ngOnInit(): void {
    this.sideNavBarService.getSideBarState().subscribe((state) => {
      this.openSideNav.set(state);
    });
  }

  closeSideBar() {
    this.openSideNav.set(false);
    this.sideNavBarService.setSidebarState(false);
  }
}
