import { Action } from '@ngrx/store';

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

export type UIActions = UiStateTestAction
    | ToggleIsLoadingAction;

