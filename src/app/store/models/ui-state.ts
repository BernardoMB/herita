import { IUser } from "../../../shared/models/IUser";

export interface IUIState {
    uiStateTestProperty: string;
    isLoading: boolean;
    user: IUser;
}

export const INITIAL_UI_STATE: IUIState = {
    uiStateTestProperty: undefined,
    isLoading: false,
    user: undefined
};
