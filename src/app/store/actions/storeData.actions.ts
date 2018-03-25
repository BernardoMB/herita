import { Action } from '@ngrx/store';

export const STORE_DATA_TEST_ACTION = 'STORE_DATA_TEST_ACTION';
export class StoreDataTestAction implements Action {
    readonly type = STORE_DATA_TEST_ACTION;
    constructor(public payload?: any) { }
}

export type StoreActions = StoreDataTestAction;