import { createReducer, on, Action } from '@ngrx/store';
import * as dashBoardAction from '@app/modules/dashboard/store/dashboard.actions';
import { IDashBoardState, initialDahBoardState } from '@app/modules/dashboard/store/dashboard.state';
import { HelperService } from '@app/core/services';

const createDashBoardReducer = createReducer(initialDahBoardState,

  //Get TabList reducers
  on(dashBoardAction.loadTabList, (state) => ({
    ...state,
  })),

  on(dashBoardAction.getTabListSuccess, (state, { tabList }) => ({
    ...state,
    tabList,

  })),

  on(dashBoardAction.getTabListFail, (state, { error }) => ({
    ...state,
    error,
  })),

  // Add new tab
  on(dashBoardAction.postTabProcess, (state) => ({
    ...state,
  })),

  on(dashBoardAction.postTabSuccess, (state, { tab }) => ({
    ...state,
    tabList: HelperService.updateStore(state.tabList, tab)
  })),

  on(dashBoardAction.postTabFail, (state, { error }) => ({
    ...state,
    error,
  })),

  //Update Tab
  on(dashBoardAction.updateTabProcess, (state) => ({
    ...state,
  })),

  on(dashBoardAction.updateTabSuccess, (state, { tabLis }) => ({
    ...state,
    tabLis,
  })),
  on(dashBoardAction.updateTabFail, (state, { error }) => ({
    ...state,
    error,
  })),

  // Load TabUseCaseWidgetList reducers
  on(dashBoardAction.LoadTabUseCaseWidgetList, (state) => ({
    ...state,
    saveSuccess: null,
    inProgress: true,
  })),

  on(dashBoardAction.LoadTabUseCaseWidgetListSuccess, (state, { tabWidgetList }) => ({
    ...state,
    tabWidgetList,
    saveSuccess: true,
    inProgress: false,
  })),

  on(dashBoardAction.LoadTabUseCaseWidgetListFail, (state, { error }) => ({
    ...state,
    error,
    saveSuccess: false,
    inProgress: false,
  })),

  //  Load ApplicationUseCaseList reducers
  on(dashBoardAction.LoadApplicationUseCaseList, (state,) => ({
    ...state,
  })),

  on(dashBoardAction.LoadApplicationUseCaseListSuccess, (state, { appUseCasesList }) => ({
    ...state,
    appUseCasesList,

  })),

  on(dashBoardAction.LoadApplicationUseCaseListFail, (state, { error }) => ({
    ...state,
    error,
  })),

  //Add new card in tab
  on(dashBoardAction.postCardProcess, (state) => ({
    ...state,
    saveSuccess: null,
    inProgress: true,
  })),

  on(dashBoardAction.postCardSuccess, (state, { card }) => ({
    ...state,
    tabWidgetList: HelperService.updateStore([...state.tabWidgetList], card),
    saveSuccess: true,
    inProgress: false,
  })),

  on(dashBoardAction.postCardFail, (state, { error }) => ({
    ...state,
    error,
    saveSuccess: false,
    inProgress: false,
  })),

  //Update Card  reducers
  on(dashBoardAction.updateCardProcess, (state) => ({
    ...state,
    saveSuccess: null,
    inProgress: true,

  })),

  on(dashBoardAction.updateCardSuccess, (state) => ({
    ...state,
    saveSuccess: true,
    inProgress: false,
  })),

  on(dashBoardAction.updateCardFail, (state, { error }) => ({
    ...state,
    error,
    saveSuccess: false,
    inProgress: false,
  })),

  //load recent Contacts reducers
  on(dashBoardAction.LoadRecentContacts, (state) => ({
    ...state,
  })),

  on(dashBoardAction.LoadRecentContactsSuccess, (state, { recentContacts }) => ({
    ...state,
    recentContacts,
  })),
  on(dashBoardAction.LoadRecentContactsFail, (state, { error }) => ({
    ...state,
    error,
  })),

  //load recetn Accounts  reducers
  on(dashBoardAction.LoadRecentAccounts, (state) => ({
    ...state,
  })),

  on(dashBoardAction.LoadRecentAccountsSuccess, (state, { recentAccounts }) => ({
    ...state,
    recentAccounts,
  })),
  on(dashBoardAction.LoadRecentAccountsFail, (state, { error }) => ({
    ...state,
    error,
  })),

  //load Recently Searched Account  reducers
  on(dashBoardAction.LoadRecentlySearchedAccounts, (state) => ({
    ...state,
  })),

  on(dashBoardAction.LoadRecentlySearchedAccountsSuccess, (state, { recentSearchAccounts }) => ({
    ...state,
    recentSearchAccounts,
  })),

  on(dashBoardAction.LoadRecentlySearchedAccountsFail, (state, { error }) => ({
    ...state,
    error,
  })),

  //load Recently Searched Contacts  reducers
  on(dashBoardAction.LoadRecentlySearchedContacts, (state) => ({
    ...state,
  })),

  on(dashBoardAction.LoadRecentlySearchedContactsSuccess, (state, { recentSearchContacts }) => ({
    ...state,
    recentSearchContacts,
  })),

  on(dashBoardAction.LoadRecentlySearchedContactsFail, (state, { error }) => ({
    ...state,
    error,
  })),

  //load Recently Viewed Contacts  reducers
  on(dashBoardAction.LoadRecentlyViewedContacts, (state) => ({
    ...state,
  })),

  // on(dashBoardAction.LoadRecentlyViewedContactsSuccess, (state, { recentAccounts }) => ({
  //   ...state,
  //   recentAccounts,
  // })),

  on(dashBoardAction.LoadRecentlyViewedContactsFail, (state, { error }) => ({
    ...state,
    error,
  })),

  //load Recently Viewed Accounts  reducers
  on(dashBoardAction.LoadRecentlyViewedAccounts, (state) => ({
    ...state,
  })),

  // on(dashBoardAction.LoadRecentlyViewedAccountsuccess, (state, { recentAccounts }) => ({
  //   ...state,
  //   recentAccounts,
  // })),

  on(dashBoardAction.LoadRecentlyViewedAccountsFail, (state, { error }) => ({
    ...state,
    error,
  })),

  //load Recently Verified Contacts  reducers
  on(dashBoardAction.LoadRecentlyVerifiedContacts, (state) => ({
    ...state,
  })),

  on(dashBoardAction.LoadRecentlyVerifiedContactsSuccess, (state, { recentVerifiedContacts }) => ({
    ...state,
    recentVerifiedContacts,
  })),

  on(dashBoardAction.LoadRecentlyVerifiedContactsFail, (state, { error }) => ({
    ...state,
    error,
  })),

  //load Recently Verified Accounts  reducers
  on(dashBoardAction.LoadRecentlyVerifiedAccounts, (state) => ({
    ...state,
  })),

  on(dashBoardAction.LoadRecentlyVerifiedAccountsSuccess, (state, { recentVerifiedAccounts }) => ({
    ...state,
    recentVerifiedAccounts,
  })),

  on(dashBoardAction.LoadRecentlyVerifiedAccountsFail, (state, { error }) => ({
    ...state,
    error,
  })),

  //load Saved Search Criteria Account  reducers
  on(dashBoardAction.LoadSavedSeacrhCriteriaAccounts, (state) => ({
    ...state,
  })),

  on(dashBoardAction.LoadSavedSeacrhCriteriaAccountsSuccess, (state, { savedSearchCriteriaAccount }) => ({
    ...state,
    savedSearchCriteriaAccount,
  })),

  on(dashBoardAction.LoadSavedSeacrhCriteriaAccountsFail, (state, { error }) => ({
    ...state,
    error,
  })),

  //load All Saved Searches  reducers
  on(dashBoardAction.LoadAllSavedSeacrhes, (state) => ({
    ...state,
  })),

  on(dashBoardAction.LoadAllSavedSeacrhesSuccess, (state, { allSavedSearches }) => ({
    ...state,
    allSavedSearches,
  })),

  on(dashBoardAction.LoadAllSavedSeacrhesFail, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function dashBoardReducer(state: IDashBoardState = initialDahBoardState, action: Action) {
  return createDashBoardReducer(state, action);
}
