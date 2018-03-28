import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IApplicationState } from '../../../store/models/app-state';
import { Store } from '@ngrx/store';
import { UserLoggedOutAction } from '../../../store/actions/uiState.actions';

@Component({
  selector: 'header-simple',
  templateUrl: './header-simple.component.html',
  styleUrls: ['./header-simple.component.scss']
})
export class HeaderSimpleComponent implements OnInit {
  @Input('showLogout') public userLoggedIn: boolean;

  public showExternalContent: boolean;

  constructor(private router: Router,
      private store: Store<IApplicationState>) {}

  ngOnInit() {
  }

  public onGoToHomePage(): void {
    this.router.navigate(['/']);   
  }

  public toggleExternalContent(): void {
    if (this.showExternalContent) {
      this.showExternalContent = false;
    } else {
      this.showExternalContent = true;
    }
  }

  public onLogOut(): void {
    this.router.navigate(['/login']);
    this.store.dispatch(new UserLoggedOutAction());
  }

  public onAbout(): void {
    this.router.navigate(['/about']);
  }
}
