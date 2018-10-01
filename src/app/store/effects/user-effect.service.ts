import { IUser } from '../../../shared/models/IUser';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie';
import {
    USER_LOGIN_ATTEMPT_ACTION,
    UserLoggedInAction,
    ErrorOcurredAction,
    USER_LOGGED_IN_ACTION,
    ERROR_OCURRED_ACTION,
    USER_LOGGED_OUT_ACTION,
    CREATE_USER_ACTION,
    CreatedUserAction,
    CREATED_USER_ACTION,
    UserLoginAttemptAction,
    CreateUserAction,
    UserLoggedOutAction,
    USER_LOGOUT_ATTEMPT_ACTION,
    USER_LOGIN_BY_ID_AND_TOKEN_ATTEMPT_ACTION,
    UserLoginByIdAndTokenAttemptAction,
    UserLogoutAttemptAction
} from '../actions/uiState.actions';
import { UserService } from '../../core/services/user.service';
import { ILoginModel } from '../../core/containers/login/login.component';

@Injectable()
export class UserEffectService {

    @Effect()
    onUserLoginAttempt$: Observable<Action> = this.action$
        .ofType(USER_LOGIN_ATTEMPT_ACTION)
        .debug('Effect: Attempting login')
        .do((action: UserLoginAttemptAction) => {
            this.toastyService.info({
                title: 'Loggin in',
                msg: `${moment().locale('US').calendar()}`,
                showClose: true,
                timeout: 1500
            });
        })
        .switchMap((action: UserLoginAttemptAction) => {
            const credentials: ILoginModel = action.payload;
            console.log('Effect: Credentials:', credentials);
            return this.userService.login(credentials)
                .map((user: IUser) => {
                    console.log('Effect: mapped to user:', user);
                    return new UserLoggedInAction(user);
                }).catch((err: string) => {
                    console.log('Effect: catched error', err);
                    return Observable.of(new ErrorOcurredAction(err))
                })
        }).debug('Effect: Login attempt server response');

    @Effect()
    onUserLoginByIdAndTokenAttempt$: Observable<Action> = this.action$
        .ofType(USER_LOGIN_BY_ID_AND_TOKEN_ATTEMPT_ACTION)
        .debug('Effect: Attempting login by id and token')
        .do((action: UserLoginByIdAndTokenAttemptAction) => {
            this.toastyService.info({
                title: 'Loggin in with token',
                msg: `${moment().locale('US').calendar()}`,
                showClose: true,
                timeout: 1500
            });
        })
        .switchMap((action: UserLoginByIdAndTokenAttemptAction) => {
            const loginObject: { userId: string, token: string } = action.payload;
            console.log('Effect: loginObject:', loginObject);
            return this.userService.loginByIdAndToken(loginObject)
                .map((user: IUser) => {
                    console.log('Effect: mapped to user:', user);
                    return new UserLoggedInAction(user);
                }).catch((err: string) => {
                    console.log('Effect: catched error', err);
                    return Observable.of(new ErrorOcurredAction(err))
                })
        }).debug('Effect: Login by id and token attempt server response');

    @Effect()
    onCreateUserAction$: Observable<Action> = this.action$
        .ofType(CREATE_USER_ACTION)
        .debug('Effect: Creating user')
        .do((action: CreateUserAction) => {
            this.toastyService.info({
                title: 'Creating user',
                msg: `${moment().locale('US').calendar()}`,
                showClose: true,
                timeout: 1500
            });
        })
        .switchMap((action: CreateUserAction) => this.userService.createUser(action.payload)
            .map((user: IUser) => {
                console.log('Effect: mapped to user:', user);
                return new CreatedUserAction(user);
            }).catch((err: string) => {
                console.log('Effcte: catched error:', err);
                return Observable.of(new ErrorOcurredAction(err))
            })
        ).debug('Effect: creating user server response');

    @Effect({ dispatch: false })
    onUserLoggedIn$: Observable<Action> = this.action$
        .ofType(USER_LOGGED_IN_ACTION)
        .debug('Effect: User logged in')
        .do((action: UserLoggedInAction) => {
            const userId = this.cookieService.getObject('userId');
            console.log('Effect: placed userId cookie', userId);
            setTimeout(() => {
                this.toastyService.success({
                    title: 'Logged in',
                    msg: `${moment().locale('US').calendar()}`,
                    showClose: true,
                    timeout: 5000
                });
            }, 0);
        });

    @Effect()
    onUserLogoutAttempt$: Observable<Action> = this.action$
        .ofType(USER_LOGOUT_ATTEMPT_ACTION)
        .debug('Attempting to logout')
        .switchMap((action: UserLogoutAttemptAction) => this.userService.logout(action.payload)
            .map(() => {
                return new UserLoggedOutAction();
            }).catch((err: string) => {
                console.log('Effect: catched error', err);
                return Observable.of(new ErrorOcurredAction(err))
            })
        ).debug('Effect: user logged out');

    @Effect({ dispatch: false })
    onUserLoggedOut$: Observable<Action> = this.action$
        .ofType(USER_LOGGED_OUT_ACTION)
        .debug('Effect: user Logged out')
        .do((action: UserLoggedOutAction) => {
            this.cookieService.remove('usr');
            localStorage.removeItem('x-auth');
            this.toastyService.success({
                title: 'Logged out',
                msg: `${moment().locale('US').calendar()}`,
                showClose: true,
                timeout: 3000
            });
        })

    @Effect({ dispatch: false })
    onCreatedUserAction$: Observable<Action> = this.action$
        .ofType(CREATED_USER_ACTION)
        .debug('Created user')
        .do((action: CreatedUserAction) => {
            this.toastyService.success({
                title: 'User created',
                msg: `${action.payload.username} is now a user`,
                showClose: true,
                timeout: 5000
            });
        });

    @Effect({ dispatch: false })
    onErrorOcurredAction$: Observable<Action> = this.action$
        .ofType(ERROR_OCURRED_ACTION)
        .debug('Error ocurred')
        .do((action: ErrorOcurredAction) => {
            this.toastyService.error({
                title: 'Error',
                msg: `${action.payload}`,
                showClose: true,
                timeout: 5000
            });
        });

    constructor(
        private action$: Actions,
        public toastyService: ToastyService,
        public toastyConfig: ToastyConfig,
        private cookieService: CookieService,
        private userService: UserService
    ) {
        this.toastyConfig.theme = 'material';
        this.toastyConfig.position = 'bottom-center';
    }
}
