import { IStoreData, INITIAL_STORE_DATA } from './../models/store-data';
import { StoreActions, STORE_DATA_TEST_ACTION, StoreDataTestAction } from '../actions/storeData.actions';
import { USER_LOGGED_OUT_ACTION, UIActions, UserLoggedOutAction } from '../actions/uiState.actions';

export function storeDataReducer(state: IStoreData = INITIAL_STORE_DATA, action: StoreActions | UIActions): IStoreData {
    switch (action.type) {
        case STORE_DATA_TEST_ACTION:
            return handleStoreDataTestAction(state, action);
        case USER_LOGGED_OUT_ACTION:
            return handleUserLoggedOutAction(state, action);
        default:
            return state;
    }
}

function handleStoreDataTestAction(state: IStoreData, action: StoreDataTestAction): IStoreData {
    const newStoreData = Object.assign({}, state);
    newStoreData.storeDataTestProperty = action.payload;
    return newStoreData;
}

function handleUserLoggedOutAction(state: IStoreData, action: UserLoggedOutAction): IStoreData {
    return INITIAL_STORE_DATA;
}
