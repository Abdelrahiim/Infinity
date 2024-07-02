import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeServiceService {
  private darkMode = signal<boolean>(false);

  getDarkMode() {
    return this.darkMode;
  }

  toggleTheme() {
    this.darkMode.update((value) => !value);
    this.setTheme();
  }

  private setTheme() {
    if (this.darkMode()) {
      localStorage.setItem('darkMode', 'true');
    } else {
      localStorage.setItem('darkMode', 'false');
    }
    document.documentElement.classList.toggle('dark');
  }
}
