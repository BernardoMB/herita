import { IUIState, INITIAL_UI_STATE } from '../models/ui-state';
import { UIActions, UI_STATE_TEST_ACTION, UiStateTestAction, TOGGLE_IS_LOADING_ACTION, ToggleIsLoadingAction } from '../actions/uiState.actions';

export function uiStateReducer(state: IUIState = INITIAL_UI_STATE, action: UIActions): IUIState {
    switch (action.type) {
        case UI_STATE_TEST_ACTION:
            return handleUiStateTestAction(state, action);
        case TOGGLE_IS_LOADING_ACTION:
            return handleToggleIsLoadingAction(state, action);
        default:
            return state;
    }
}

function handleUiStateTestAction(state: IUIState, action: UiStateTestAction): IUIState {
    const newUiState = Object.assign({}, state);
    newUiState.uiStateTestProperty = action.payload;
    return newUiState;
}

function handleToggleIsLoadingAction(state: IUIState, action: ToggleIsLoadingAction): IUIState {
    const newUiState = Object.assign({}, state);
    newUiState.isLoading = action.payload;
    return newUiState;
}
