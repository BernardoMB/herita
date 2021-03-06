import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IApplicationState } from '../../../store/models/app-state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { UserLoggedOutAction, UserLogoutAttemptAction } from '../../../store/actions/uiState.actions';

import { Observable } from 'rxjs/Observable';
import { IUser } from '../../../../shared/models/IUser';

import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class MainComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('rightSidenav') rightSidenav: MatSidenav;

  public userLoggedIn = false;
  public showSidenav = false;
  public showRightSidenav = false;

  public user$: Observable<IUser>;
  public user: IUser;
  public username: string;

  public reason = '';
  public visible = false;

  constructor(
    private elementRef: ElementRef,
    private store: Store<IApplicationState>,
    private router: Router
  ) {
    this.user$ = this.store.select(state => state.uiState.user);
    this.user$.subscribe(user => {
      if (!!user) {
        this.user = user;
        this.username = user.username;
        if (user) {
          this.userLoggedIn = true;
        }
      }
    });
  }

  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fafafa';
  }
  
  closeSidenav(reason: string): void {
    this.reason = reason;
    this.sidenav.close();
  }

  public toggleSidenav(): void {
    this.showSidenav = !this.showSidenav;
    if (this.showSidenav) {
      this.sidenav.open();
    } else {
      this.closeSidenav('Hamburger');
    }
  }

  public toggleTools(): void {
    this.visible = !this.visible;
  }

  public onGoToHomePage(): void {
    this.router.navigate(['/']);
  }

  public onLogOut(): void {
    this.router.navigate(['/login']);
    this.store.dispatch(new UserLogoutAttemptAction(this.user));
  }

}
