import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ILookupState } from "@app/shared/stores";

export const lookUpFeatureSelector = createFeatureSelector<ILookupState>('lookup')
export const lookUpSelector = createSelector(lookUpFeatureSelector,(state) => state.user)
export const getUserDetailSelector = createSelector(lookUpFeatureSelector,(state) => state.currentUserDetail)
export const getLoaderStateSelector = createSelector(lookUpFeatureSelector,(state) => state.isLoading)
