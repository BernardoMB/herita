import { IUser } from '../../../shared/models/IUser';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from "ng2-toasty";
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie';
import { USER_LOGIN_ATTEMPT_ACTION, UserLoggedInAction, ErrorOcurredAction, USER_LOGGED_IN_ACTION } from '../actions/uiState.actions';
import { UserService } from '../../core/services/user.service';

@Injectable()
export class UserEffectService {

    @Effect()
    onUserLoginAttempt$: Observable<Action> = this.action$
        .ofType(USER_LOGIN_ATTEMPT_ACTION)
        .debug("Attempting login")
        .do(action => {
            this.toastyService.info({
                title: 'Loggin in',
                msg: `${new Date().toString()}`,
                showClose: true,
                timeout: 1500
            });
        })
        .switchMap((action: any) => this.userService.login(action.payload))
        .debug("Server login attempt response")
        .map(res => {
            return new UserLoggedInAction(res);
        })
        .catch( err => Observable.of(new ErrorOcurredAction(err)));
       
    @Effect({ dispatch: false })
    onUserLoggedIn$: Observable<Action> = this.action$
        .ofType(USER_LOGGED_IN_ACTION)
        .debug("User logged in")
        .do((action: any) => {
            this.cookieService.putObject('usr', action.payload, { expires: moment().hours(23).minute(59).second(59).toDate() });
            setTimeout(() => {
                this.toastyService.success({
                    title: 'Session started',
                    msg: `${moment().locale('US').calendar()}`,
                    showClose: true,
                    timeout: 2000
                });
            }, 1000);
        });

    /**
     * Removes the User object cookie and displays a toast whenever the user logged out action is emmited
     */
    /* @Effect({ dispatch: false })
    userLoggedOut$: Observable<Action> = this.action$
        .ofType(USER_LOGGED_OUT_ACTION)
        .debug("User logged out")
        .do(action => {
            this.cookieService.remove('usr');
            this.toastyService.info({
                title: this.wordList['LOGGING_OUT'] + "...",
                msg: `${moment().locale(this.language).calendar()}`,
                showClose: true,
                timeout: 1500
            });
        }); */

    constructor(private action$: Actions,
        public toastyService: ToastyService,
        public toastyConfig: ToastyConfig,
        private cookieService: CookieService,
        private http: Http,
        private userService: UserService) 
    {
        this.toastyConfig.theme = 'material';
        this.toastyConfig.position = 'bottom-center';
    }
}
