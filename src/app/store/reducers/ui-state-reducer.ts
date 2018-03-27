import { IUIState, INITIAL_UI_STATE } from '../models/ui-state';
import { UIActions,
    UI_STATE_TEST_ACTION,
    UiStateTestAction,
    TOGGLE_IS_LOADING_ACTION,
    ToggleIsLoadingAction,
    USER_LOGIN_ATTEMPT_ACTION,
    UserLoginAttemptAction, 
    USER_LOGGED_IN_ACTION,
    UserLoggedInAction,
    ERROR_OCURRED_ACTION,
    ErrorOcurredAction} from '../actions/uiState.actions';

export function uiStateReducer(state: IUIState = INITIAL_UI_STATE, action: UIActions): IUIState {
    switch (action.type) {
        case UI_STATE_TEST_ACTION:
            return handleUiStateTestAction(state, action);
        case TOGGLE_IS_LOADING_ACTION:
            return handleToggleIsLoadingAction(state, action);
        case USER_LOGIN_ATTEMPT_ACTION:
            return handleUserLoginAttemptAction(state, action);
        case USER_LOGGED_IN_ACTION:
            return handleUserLoggedInAction(state, action);
        case ERROR_OCURRED_ACTION: 
            return handleErrorOcurredAction(state, action);
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

function handleUserLoginAttemptAction(state: IUIState, action: UserLoginAttemptAction) : IUIState {
    const newUiState = Object.assign({}, state, { isLoading: true});
    newUiState.user = undefined;
    return newUiState;
}

function handleUserLoggedInAction(state: IUIState, action: UserLoggedInAction): IUIState {
    const newUiState = Object.assign({}, state, { isLoading: false});
    newUiState.user = action.payload;
    return newUiState;
}

function handleErrorOcurredAction(state: IUIState, action: ErrorOcurredAction): IUIState {
    const newUiState = Object.assign({}, state, { isLoading: false});
    return newUiState;
}