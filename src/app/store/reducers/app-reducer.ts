import { ActionReducerMap } from "@ngrx/store";
import { IApplicationState } from "../models/app-state";
import { storeDataReducer } from "./store-data-reducer";
import { uiStateReducer } from "./ui-state-reducer";

export const reducers: ActionReducerMap<IApplicationState> = {
    storeData: storeDataReducer,
    uiState: uiStateReducer
};