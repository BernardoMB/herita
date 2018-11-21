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
    ErrorOcurredAction,
    USER_LOGGED_OUT_ACTION,
    UserLoggedOutAction,
    CREATE_USER_ACTION,
    CreateUserAction,
    CREATED_USER_ACTION,
    CreatedUserAction,
    USER_LOGIN_BY_ID_AND_TOKEN_ATTEMPT_ACTION,
    UserLoginByIdAndTokenAttemptAction
} from '../actions/uiState.actions';
import { IStoreData } from '../models/store-data';

export function uiStateReducer(state: IUIState = INITIAL_UI_STATE, action: UIActions): IUIState {
    console.log('Reducer handling', action.type);
    switch (action.type) {
        case UI_STATE_TEST_ACTION:
            return handleUiStateTestAction(state, action);
        case TOGGLE_IS_LOADING_ACTION:
            return handleToggleIsLoadingAction(state, action);
        case USER_LOGIN_ATTEMPT_ACTION:
            return handleUserLoginAttemptAction(state, action);
        case USER_LOGIN_BY_ID_AND_TOKEN_ATTEMPT_ACTION:
            return handleUserLoginByIdAndTokenAttemptAction(state, action);
        case USER_LOGGED_IN_ACTION:
            return handleUserLoggedInAction(state, action);
        case USER_LOGGED_OUT_ACTION:
            return handleUserLoggedOutAction(state, action);
        case CREATE_USER_ACTION:
            return handleCreateUserAction(state, action);
        case CREATED_USER_ACTION:
            return handleCreatedUserAction(state, action);
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

function handleUserLoginAttemptAction(state: IUIState, action: UserLoginAttemptAction): IUIState {
    const newUiState = Object.assign({}, state, { isLoading: true});
    newUiState.user = undefined;
    return newUiState;
}

function handleUserLoginByIdAndTokenAttemptAction(state: IUIState, action: UserLoginByIdAndTokenAttemptAction): IUIState {
    const newUiState = Object.assign({}, state, { isLoading: true});
    newUiState.user = undefined;
    return newUiState;
}

function handleUserLoggedInAction(state: IUIState, action: UserLoggedInAction): IUIState {
    const newUiState = Object.assign({}, state, { isLoading: false});
    newUiState.user = action.payload;
    return newUiState;
}

function handleUserLoggedOutAction(state: IUIState, action: UserLoggedOutAction): IUIState {
    console.log('Reducer: handling user logged out action');
    return INITIAL_UI_STATE;
}

function handleCreateUserAction(state: IUIState, action: CreateUserAction): IUIState {
    const newUiState = Object.assign({}, state, { isLoading: true});
    return newUiState;
}

function handleCreatedUserAction(state: IUIState, action: CreatedUserAction): IUIState {
    const newUiState = Object.assign({}, state, { isLoading: false});
    return newUiState;
}

function handleErrorOcurredAction(state: IUIState, action: ErrorOcurredAction | CreateUserAction): IUIState {
    const newUiState = Object.assign({}, state, { isLoading: false});
    return newUiState;
}
