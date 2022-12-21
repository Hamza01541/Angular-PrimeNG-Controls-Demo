import { ApplicationUseCases, Tab, UseCasesWidget } from "@app/shared/models";

import { createAction, props } from "@ngrx/store";

// Get TabList
export const loadTabList = createAction(
  '[GetTabList] getTabList',
);

// GetTabList Successful
export const getTabListSuccess = createAction(
  '[GetTabList] getTabListSuccessfully',
  props<{ tabList: Tab[] }>()
);

// GetTabList Failure
export const getTabListFail = createAction(
  '[GetTabList] getTabListFail',
  props<{ error: any }>()
);

// Post Tab
export const postTabProcess = createAction(
  '[PostTabList] postTabList',
  props<{ tab: Tab }>()
);

// Post Tab Successful
export const postTabSuccess = createAction(
  '[PostTabList] postTabListSuccessfully',
  props<{ tab: Tab }>()
);

// Post Tab Failure
export const postTabFail = createAction(
  '[PostTabList] postTabListFail',
  props<{ error: any }>()
);

// Update Tab
export const updateTabProcess = createAction(
  '[UpdateTab] updateTab',
  props<{ tab: Tab }>()
);

// Update Tab Progress Successful
export const updateTabSuccess = createAction(
  '[UpdateTab] updateTabProcessSuccess',
  props<{ tabLis: Tab[] }>()
);

// Update Tab Progress Failure
export const updateTabFail = createAction(
  '[UpdateTab] updateUserProcessFail',
  props<{ error: any }>()
);

// Delete Tab
export const deleteTabProcess = createAction(
  '[DeleteTab] DeleteTabProcess',
  props<{ id: number }>()
);

// Delete Tab Successful
export const deleteTabSuccess = createAction(
  '[DeleteTab] DeleteTabSuccessfully'
);

// Delete Tab Progress Failure
export const deleteTabFail = createAction(
  '[DeleteTab] DeleteTabFail',
  props<{ error: any }>()
);

// Load ApplicationUseCaseList
export const LoadApplicationUseCaseList = createAction(
  '[ApplicationUseCaseList] LoadApplicationUseCaseList'
);

// Load ApplicationUseCaseList Successful
export const LoadApplicationUseCaseListSuccess = createAction(
  '[ApplicationUseCaseListSuccess] LoadApplicationUseCaseListSuccess',
  props<{ appUseCasesList: ApplicationUseCases[] }>()
);

// GetTabList Failure
export const LoadApplicationUseCaseListFail = createAction(
  '[ApplicationUseCaseListFail] LoadApplicationUseCaseListFail',
  props<{ error: any }>()
);

// Load TabUseCaseWidgetList
export const LoadTabUseCaseWidgetList = createAction(
  '[TabUseCaseWidget] LoadTabUseCaseWidgetList',
  props<{ tabId: number }>()
);

// Load TabUseCaseWidgetList Successful
export const LoadTabUseCaseWidgetListSuccess = createAction(
  '[TabUseCaseWidgetSuccess] LoadTabUseCaseWidgetListSuccess',
  props<{ tabWidgetList: UseCasesWidget[] }>()
);

// Load TabUseCaseWidgetList Failure
export const LoadTabUseCaseWidgetListFail = createAction(
  '[TabUseCaseWidgetFail] LoadTabUseCaseWidgetListFail',
  props<{ error: any }>()
);

// Post Tab
export const postCardProcess = createAction(
  '[PostCard] postCard',
  props<{ newAddedCard: UseCasesWidget }>()
);

// Post Tab Successful
export const postCardSuccess = createAction(
  '[PostCard] postCardSuccessfully',
  props<{ card: UseCasesWidget }>()
);

// Post Tab Failure
export const postCardFail = createAction(
  '[postCard] postCardFail',
  props<{ error: any }>()
);

// Update Card
export const updateCardProcess = createAction(
  '[UpdateCard] updateCard',
  props<{ id: number }>()
);

// Update Card Successful
export const updateCardSuccess = createAction(
  '[UpdateCard] updateCardSuccess',
);

// Update Card Failure
export const updateCardFail = createAction(
  '[UpdateTab] updateCardFail',
  props<{ error: any }>()
);

// Delete Card
export const deleteCardProcess = createAction(
  '[DeleteCard] deleteCardProcess',
  props<{ id: number }>()
);

// Delete Card Successful
export const deleteCardSuccess = createAction(
  '[DeleteCard] deleteCardSuccessfully'
);

// Delete Card Progress Failure
export const deleteCardFail = createAction(
  '[DeleteCard] deleteCardFail',
  props<{ error: any }>()
);

// Recent Contacts
export const LoadRecentContacts = createAction(
  '[LoadRecentContacts] LoadRecentContacts',
);

// Recent Contacts Successful
export const LoadRecentContactsSuccess = createAction(
  '[LoadRecentContacts] LoadRecentContactsSuccess',
  props<{ recentContacts: any[] }>()
);

// Recent Contacts Failure
export const LoadRecentContactsFail = createAction(
  '[LoadRecentContacts] LoadRecentContactsFail',
  props<{ error: any }>()
);

// Load Recent Accounts
export const LoadRecentAccounts = createAction(
  '[LoadRecentAccounts] LoadRecentAccounts',
);

// Load Recent Accounts Successful
export const LoadRecentAccountsSuccess = createAction(
  '[LoadRecentAccounts] LoadRecentAccountsSuccess',
  props<{ recentAccounts: any[] }>()
);

// Load Recent Accounts Failure
export const LoadRecentAccountsFail = createAction(
  '[LoadRecentAccounts] LoadRecentAccountsFail',
  props<{ error: any }>()
);

// Load Recently Searched Accounts
export const LoadRecentlySearchedAccounts = createAction(
  '[LoadRecentlySearchedAccounts] LoadRecentlySearchedAccounts',
);

//Load Recently Searched Accounts Successful
export const LoadRecentlySearchedAccountsSuccess = createAction(
  '[LoadRecentlySearchedAccounts] LoadRecentlySearchedAccountsSuccess',
  props<{recentSearchAccounts:any[]}>()
);

//Load Recently Searched Accounts Failure
export const LoadRecentlySearchedAccountsFail = createAction(
  '[LoadRecentlySearchedAccounts] LoadRecentlySearchedAccountsFail',
  props<{ error: any }>()
);

// Load Recently Searched Contacts
export const LoadRecentlySearchedContacts = createAction(
  '[LoadRecentlySearchedContacts] LoadRecentlySearchedContacts',
);

//Load Recently Searched Contacts Successful
export const LoadRecentlySearchedContactsSuccess = createAction(
  '[LoadRecentlySearchedContacts] LoadRecentlySearchedContactsSuccess',
  props<{recentSearchContacts:any[]}>()
);

//Load Recently Searched Contacts Failure
export const LoadRecentlySearchedContactsFail = createAction(
  '[LoadRecentlySearchedContacts] LoadRecentlySearchedContactsFail',
  props<{ error: any }>()
);

// Load Recently Viewed Contacts
export const LoadRecentlyViewedContacts = createAction(
  '[LoadRecentlyViewedContacts] LoadRecentlyViewedContacts',
);

//Load Recently Viewed Contacts Successful
export const LoadRecentlyViewedContactsSuccess = createAction(
  '[LoadRecentlyViewedContacts] LoadRecentlyViewedContactsSuccess',
  props<{recentViewedContacts:any[]}>()
);

//Load Recently Viewed Contacts Failure
export const LoadRecentlyViewedContactsFail = createAction(
  '[LoadRecentlyViewedContacts] LoadRecentlyViewedContactsFail',
  props<{ error: any }>()
);

// Load Recently Viewed Accounts
export const LoadRecentlyViewedAccounts = createAction(
  '[LoadRecentlyViewedAccounts] LoadRecentlyViewedContacts',
);

//Load Recently Viewed Accounts Successful
export const LoadRecentlyViewedAccountsSuccess = createAction(
  '[LoadRecentlyViewedAccounts] LoadRecentlyViewedAccountsSuccess',
  props<{recentViewedAccounts:any[]}>()
);

//Load Recently Viewed Accounts Failure
export const LoadRecentlyViewedAccountsFail = createAction(
  '[LoadRecentlyViewedContacts] LoadRecentlyViewedAccountsFail',
  props<{ error: any }>()
);

// Load Recently Verified Contacts
export const LoadRecentlyVerifiedContacts = createAction(
  '[LoadRecentlyVerifiedContacts] LoadRecentlyVerifiedContacts',
);

//Load Recently Verified Contacts Successful
export const LoadRecentlyVerifiedContactsSuccess = createAction(
  '[LoadRecentlyVerifiedContacts] LoadRecentlyVerifiedContactsSuccess',
  props<{recentVerifiedContacts:any[]}>()
);

//Load Recently Verified Contacts Failure
export const LoadRecentlyVerifiedContactsFail = createAction(
  '[LoadRecentlyVerifiedContacts] LoadRecentlyVerifiedContactsFail',
  props<{ error: any }>()
);

// Load Recently Verified Accounts
export const LoadRecentlyVerifiedAccounts = createAction(
  '[LoadRecentlyVerifiedAccounts] LoadRecentlyViewedContacts',
);

//Load Recently Viewed Accounts Successful
export const LoadRecentlyVerifiedAccountsSuccess = createAction(
  '[LoadRecentlyVerifiedAccounts] LoadRecentlyViewedAccountsSuccess',
  props<{recentVerifiedAccounts:any[]}>()
);

//Load Recently Viewed Accounts Failure
export const LoadRecentlyVerifiedAccountsFail = createAction(
  '[LoadRecentlyVerifiedContacts] LoadRecentlyVerifiedAccountsFail',
  props<{ error: any }>()
);

// Load Saved Seacrh Criteria Accounts
export const LoadSavedSeacrhCriteriaAccounts = createAction(
  '[LoadSavedSeacrhCriteriaAccounts] LoadSavedSeacrhCriteriaAccounts',
);

//Load Saved Seacrh Criteria Accounts Successful
export const LoadSavedSeacrhCriteriaAccountsSuccess = createAction(
  '[LoadSavedSeacrhCriteriaAccounts] LoadSavedSeacrhCriteriaAccountsSuccess',
  props<{savedSearchCriteriaAccount:any[]}>()
);

//Load Saved Seacrh Criteria Accounts Failure
export const LoadSavedSeacrhCriteriaAccountsFail = createAction(
  '[LoadSavedSeacrhCriteriaAccounts] LoadSavedSeacrhCriteriaAccountsFail',
  props<{ error: any }>()
);
// Load All Saved Seacrhes
export const LoadAllSavedSeacrhes = createAction(
  '[LoadAllSavedSeacrhes] LoadAllSavedSeacrhes',
);

//Load All Saved Seacrhes Successful
export const LoadAllSavedSeacrhesSuccess = createAction(
  '[LoadSavedSeacrhCriteriaAccounts] LoadAllSavedSeacrhesSuccess',
  props<{allSavedSearches:any[]}>()
);

//Load All Saved Seacrhes Failure
export const LoadAllSavedSeacrhesFail = createAction(
  '[LoadAllSavedSeacrhes] LoadAllSavedSeacrhesFail',
  props<{ error: any }>()
);






