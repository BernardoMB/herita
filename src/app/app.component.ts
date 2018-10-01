import { Component, OnInit } from '@angular/core';
import { IApplicationState } from './store/models/app-state';
import { Store } from '@ngrx/store';
import { UserLoginByIdAndTokenAttemptAction } from './store/actions/uiState.actions';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { mapStateToUiStateTestPropperty } from './store/mappers/test-mappers';
import { ToastyConfig } from 'ng2-toasty';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { CookieService } from 'ngx-cookie';
import { IUser } from '../shared/models/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public isLoadingObs: Observable<boolean>;
  public isLoadingSubscription: Subscription;

  public testString: string;
  public testStringObs: Observable<string>;
  public testStringSubscription: Subscription;

  constructor(
    private cookieService: CookieService,
    private store: Store<IApplicationState>,
    private toastyConfig: ToastyConfig,
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    toastyConfig.theme = 'material';

    const userId = <string>this.cookieService.getObject('userId');
    const token = localStorage.getItem('x-auth');
    if (userId && token !== 'null') {
      console.log('App component: userId: ', userId);
      console.log('App component: token: ', token);
      console.log('Dispatching UserLoginByIdAndTokenAttemptAction');
      this.store.dispatch(new UserLoginByIdAndTokenAttemptAction({
        userId,
        token
      }));
    } else {
      console.log('App component: No user and token found in local storage');
      localStorage.removeItem('x-auth');
      this.cookieService.remove('userId');
      console.log('App component: Redirecting to login page');
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
    this.isLoadingObs = this.store.select(state => state.uiState.isLoading);
    this.isLoadingSubscription = this.isLoadingObs
      .subscribe(value => value ? this.startLoading() : this.completeLoading());

    this.testStringObs = this.store.select((state: IApplicationState) => mapStateToUiStateTestPropperty(state));
    this.testStringSubscription = this.testStringObs
      .subscribe(value => value ? this.testString = value : this.testString = 'This text will change');

    /* this.store.dispatch(new ToggleIsLoadingAction(true)); */
    /* setTimeout(() => {
      this.store.dispatch(new ToggleIsLoadingAction(false));
    }, 5000); */

    /* setTimeout(() => {
      this.store.dispatch(new UiStateTestAction('Ui test string'));
    }, 2000); */
  }

  public startLoading(): void {
    this.slimLoadingBarService.start();
  }
  public stopLoading(): void {
    this.slimLoadingBarService.stop();
  }
  public completeLoading(): void {
    this.slimLoadingBarService.complete();
  }

}
