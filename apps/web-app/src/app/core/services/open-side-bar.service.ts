import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenSideBarService {
  private isOpen$ = new BehaviorSubject<boolean>(false);

  setSidebarState(state: boolean) {
    this.isOpen$.next(state);
  }

  getSideBarState() {
    return this.isOpen$;
  }
}
