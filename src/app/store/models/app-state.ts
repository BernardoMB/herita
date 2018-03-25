import { INITIAL_UI_STATE, IUIState } from './ui-state';
import { INITIAL_STORE_DATA, IStoreData } from './store-data';

export interface IApplicationState {
    storeData: IStoreData,
    uiState: IUIState
}

export const INITIAL_APPLICATION_STATE: IApplicationState = {
    uiState: INITIAL_UI_STATE,
    storeData: INITIAL_STORE_DATA
};
