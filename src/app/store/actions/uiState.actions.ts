import { Action } from '@ngrx/store';
import { IUser } from '../../../shared/models/IUser';

export const UI_STATE_TEST_ACTION = 'UI_STATE_TEST_ACTION';
export class UiStateTestAction implements Action {
    readonly type = UI_STATE_TEST_ACTION;
    constructor(public payload?: any) { }
}

export const TOGGLE_IS_LOADING_ACTION = 'TOGGLE_IS_LOADING_ACTION';
export class ToggleIsLoadingAction implements Action {
    readonly type = TOGGLE_IS_LOADING_ACTION;
    constructor(public payload: boolean) { }
}

//#region User actions
    export const USER_LOGIN_ATTEMPT_ACTION = 'USER_LOGIN_ATTEMPT_ACTION';
    export class UserLoginAttemptAction implements Action {
        readonly type = USER_LOGIN_ATTEMPT_ACTION;
        constructor(public payload: any) { }
    }

    export const USER_LOGGED_IN_ACTION = 'USER_LOGGED_IN_ACTION';
    export class UserLoggedInAction implements Action {
        readonly type = USER_LOGGED_IN_ACTION;
        constructor(public payload: IUser) { }
    }
//#endregion


export const ERROR_OCURRED_ACTION = 'ERROR_OCURRED_ACTION';
export class ErrorOcurredAction implements Action {
    readonly type = ERROR_OCURRED_ACTION;
    constructor(public payload?: any) { }
}

export type UIActions = UiStateTestAction
    | ToggleIsLoadingAction
    | UserLoginAttemptAction
    | UserLoggedInAction
    | ErrorOcurredAction;

