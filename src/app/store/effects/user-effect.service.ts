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
import { USER_LOGIN_ATTEMPT_ACTION, UserLoggedInAction, ErrorOcurredAction, USER_LOGGED_IN_ACTION, ERROR_OCURRED_ACTION, USER_LOGGED_OUT_ACTION } from '../actions/uiState.actions';
import { UserService } from '../../core/services/user.service';

@Injectable()
export class UserEffectService {

    @Effect()
    onUserLoginAttempt$: Observable<Action> = this.action$
        .ofType(USER_LOGIN_ATTEMPT_ACTION)
        .debug("Effect: Attempting login")
        .do(action => {
            this.toastyService.info({
                title: 'Loggin in',
                msg: `${moment().locale('US').calendar()}`,
                showClose: true,
                timeout: 1500
            });
        })
        .switchMap((action: any) => this.userService.login(action.payload)
            
        ).debug("Effect: Login attempt server response")
        .map(res => {
            console.log('Effect: mapped response', res);
            if (res.status == 200) {
                const response = JSON.parse(res._body);
                const user: IUser = {
                    _id: response._id,
                    username: response.username,
                    email: response.email,
                    password: response.password,
                    rol: response.rol
                }
                return new UserLoggedInAction(user);
            } else {
                return new ErrorOcurredAction(res._body);
            }
        })
        .catch(err => {
            console.log('Effect: catched error', err);
            return Observable.of(new ErrorOcurredAction(err._body))
        });
        

    @Effect({ dispatch: false })
    onUserLoggedIn$: Observable<Action> = this.action$
        .ofType(USER_LOGGED_IN_ACTION)
        .debug("Effect: User logged in")
        .do((action: any) => {
            this.cookieService.putObject('usr', action.payload, { /* expires: moment().hours(11).minute(59).second(59).toDate() */ });
            const usr = this.cookieService.getObject('usr');
            console.log('Effect: placed user cookie', usr);
            setTimeout(() => {
                this.toastyService.success({
                    title: 'Logged in',
                    msg: `${moment().locale('US').calendar()}`,
                    showClose: true,
                    timeout: 5000
                });
            }, 0);
        });

    @Effect({ dispatch: false })
    userLoggedOut$: Observable<Action> = this.action$
        .ofType(USER_LOGGED_OUT_ACTION)
        .debug("User logged out")
        .do(action => {
            this.cookieService.remove('usr');
            this.toastyService.success({
                title: 'Logged out',
                msg: `${moment().locale('US').calendar()}`,
                showClose: true,
                timeout: 3000
            });
        });

    @Effect({ dispatch: false })
    onErrorOcurredAction$: Observable<Action> = this.action$
        .ofType(ERROR_OCURRED_ACTION)
        .debug("Error ocurred")
        .do((action: any) => {
            this.toastyService.error({
                title: 'Error',
                msg: `${action.payload}`,
                showClose: true,
                timeout: 5000
            });
        });

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
