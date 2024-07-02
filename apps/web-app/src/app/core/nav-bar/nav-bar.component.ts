import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsMenuComponent } from './apps-menu/apps-menu.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { OpenSideBarService } from '../services/open-side-bar.service';
import { DarkModeServiceService } from '../services/dark-mode-service.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, AppsMenuComponent, UserMenuComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  private isOpen = false;
  constructor(
    private openSideBarService: OpenSideBarService,
    public darkModeService: DarkModeServiceService
  ) {}

  ngOnInit() {
    // to keep sideNavBar State in Sync
    this.openSideBarService
      .getSideBarState()
      .subscribe((state) => (this.isOpen = state));
  }

  toggleSideBar() {
    this.isOpen = !this.isOpen;
    this.openSideBarService.setSidebarState(this.isOpen);
  }

  toggleTheme() {
    this.darkModeService.toggleTheme();
  }
}
