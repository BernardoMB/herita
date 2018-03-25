import { IStoreData, INITIAL_STORE_DATA } from './../models/store-data';
import { StoreActions, STORE_DATA_TEST_ACTION, StoreDataTestAction } from '../actions/storeData.actions';

export function storeDataReducer(state: IStoreData = INITIAL_STORE_DATA, action: StoreActions): IStoreData {
    switch (action.type) {
        case STORE_DATA_TEST_ACTION:
            return handleStoreDataTestAction(state, action);
        default:
            return state;
    }
}

function handleStoreDataTestAction(state: IStoreData, action: StoreDataTestAction): IStoreData {
    const newStoreData = Object.assign({}, state);
    newStoreData.storeDataTestProperty = action.payload;
    return newStoreData;
}
