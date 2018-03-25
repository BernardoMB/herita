import {IApplicationState } from '../models/app-state';

export function mapStateToUiStateTestPropperty(state: IApplicationState): string {
    return state.uiState.uiStateTestProperty;
}

export function mapStateToStoreDataTestPropperty(state: IApplicationState): string {
    return state.storeData.storeDataTestProperty;
}
