export interface IUIState {
    uiStateTestProperty: string;
    isLoading: boolean;
    user: any;
}

export const INITIAL_UI_STATE: IUIState = {
    uiStateTestProperty: undefined,
    isLoading: false,
    user: undefined
};
