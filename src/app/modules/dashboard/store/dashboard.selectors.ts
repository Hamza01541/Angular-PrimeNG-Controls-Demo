import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IDashBoardState } from "@app/modules/dashboard/store/dashboard.state";

export const dashBoardFeatureSelector = createFeatureSelector<IDashBoardState>('dashboard');
export const getTabList = createSelector(dashBoardFeatureSelector, (state) => state.tabList);
export const getAppUseCasesList = createSelector(dashBoardFeatureSelector, (state) => state.appUseCasesList);
export const getTabWidgetList = createSelector(dashBoardFeatureSelector, (state) => state.tabWidgetList);
export const getRecentAccounts = createSelector(dashBoardFeatureSelector, (state) => state.recentAccounts);
export const getRecentContacts = createSelector(dashBoardFeatureSelector, (state) => state.recentContacts);
export const getRecentlySearchedAccounts = createSelector(dashBoardFeatureSelector, (state) => state.recentSearchAccounts);
export const getRecentlySearchedContacts = createSelector(dashBoardFeatureSelector, (state) => state.recentSearchContacts);
export const getRecentlyViewedAccounts = createSelector(dashBoardFeatureSelector, (state) => state.recentViewedAccounts);
export const getRecentlyViewedContacts = createSelector(dashBoardFeatureSelector, (state) => state.recentViewedContacts);
export const getRecentlyVerifiedAccounts = createSelector(dashBoardFeatureSelector, (state) => state.recentVerifiedAccounts);
export const getRecentlyVerifiedContacts = createSelector(dashBoardFeatureSelector, (state) => state.recentVerifiedContacts);
export const getSavedSearchCriteriaAccounts = createSelector(dashBoardFeatureSelector, (state) => state.savedSearchCriteriaAccount);
export const getAllSavedSearches = createSelector(dashBoardFeatureSelector, (state) => state.allSavedSearches);
