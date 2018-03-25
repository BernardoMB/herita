import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { UI_STATE_TEST_ACTION, UiStateTestAction } from '../actions/uiState.actions';
import { STORE_DATA_TEST_ACTION } from '../actions/storeData.actions';
import { ToastyService, ToastyConfig, ToastData } from 'ng2-toasty';
import * as moment from 'moment';

@Injectable()
export class TestEffectService {

    @Effect({dispatch: false})
    onUiStateTestAction$: Observable<Action> = this.action$
        .ofType(UI_STATE_TEST_ACTION)
        .debug('UI_STATE_ACTION was fired')
        .map((action: UiStateTestAction) => {
            console.log('Logging action', action);
            setTimeout(() => {
                this.toastyService.success({
                    title: 'UI_STATE_ACTION was fired',
                    msg: `${moment().locale('es').calendar()}`,
                    showClose: true,
                    timeout: 2500
                });           
            }, 1);
            return action;
        });

    @Effect({dispatch: false})
    onStoreDataTestAction$: Observable<Action> = this.action$
        .ofType(STORE_DATA_TEST_ACTION)
        .debug('STORE_DATA_TEST_ACTION fired')
        .map(function (action) {
            console.log('Logging action', action);
            setTimeout(() => {
                this.toastyService.success({
                    title: 'STORE_DATA_TEST_ACTION fired',
                    msg: `${moment().locale('es').calendar()}`,
                    showClose: true,
                    timeout: 2500
                });
            }, 1);
            return action;
        });

    constructor(
        private action$: Actions,
        public toastyService: ToastyService,
        public toastyConfig: ToastyConfig
    ) {       
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.position = 'bottom-center';
    }
}
