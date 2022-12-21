import {
  ApplicationUseCases,
  Tab,
  UseCasesWidget
} from "@app/shared/models";

/** State for Tab store. */
export interface IDashBoardState {
  tabList: Tab[],
  appUseCasesList: ApplicationUseCases[],
  tabWidgetList: UseCasesWidget[],
  recentAccounts: any[],
  recentContacts: any[],
  card: UseCasesWidget,
  recentSearchContacts:any[],
  recentSearchAccounts:any[],
  savedSearchCriteriaAccount:any[],
  recentVerifiedAccounts:any[],
  recentVerifiedContacts:any[],
  recentViewedAccounts:any[],
  recentViewedContacts:any[],
  allSavedSearches: any[]
}

/** Initial state for Tab store. */
export const initialDahBoardState: IDashBoardState = {
  tabList: [],
  appUseCasesList: [],
  tabWidgetList: [],
  recentAccounts: [],
  recentContacts: [],
  card: null,
  recentSearchContacts:[],
  recentSearchAccounts:[],
  savedSearchCriteriaAccount:[],
  recentVerifiedAccounts:[],
  recentVerifiedContacts:[],
  recentViewedAccounts:[],
  recentViewedContacts:[],
  allSavedSearches: []
};
