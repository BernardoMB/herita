import { Component, OnInit } from '@angular/core';
import { IApplicationState } from './store/models/app-state';
import { Store } from '@ngrx/store';
import { UiStateTestAction, ToggleIsLoadingAction, UserLoggedInAction } from './store/actions/uiState.actions';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { mapStateToUiStateTestPropperty } from './store/mappers/test-mappers';
import { ToastyConfig } from 'ng2-toasty';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { CookieService } from 'ngx-cookie';
import { IUser } from '../shared/models/IUser';

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

  constructor (
    private cookieService: CookieService,
    private store: Store<IApplicationState>,
    private toastyConfig: ToastyConfig,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    const usr = this.cookieService.getObject('usr');
    if (usr) {
      console.log('AppComponent: User found in cookies', usr);
      this.store.dispatch(new UserLoggedInAction(<IUser>usr));
    } else {
      console.log('AppComponent: No user found in cookies');
    }
    toastyConfig.theme = 'material';
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
