import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private subjectNavbar$ = new Subject<boolean>();

  constructor() {
  }

  showNavbar(pShowNav: boolean) {
    if (pShowNav) {
      setTimeout(() => {
        this.subjectNavbar$.next(pShowNav);
      }, 300);

    } else {
      this.subjectNavbar$.next(pShowNav)
    }
  }

  getNavbarStatus$(): Observable<boolean> {
    return this.subjectNavbar$.asObservable();
  }

}
