import { createReducer, on, Action } from '@ngrx/store';
import * as searchAction from '@app/modules/search/store/search.actions';
import { SearchState, initialSearchState } from '@app/modules/search/store/search.state'

const createSearchReducer = createReducer(initialSearchState,
  // Contact list on name searching
  on(searchAction.getContactList, (state,) => ({
    ...state,
  })),

  on(searchAction.getContactListSuccess, (state, { contactSearchByNameResp }) => ({
    ...state,
    contactSearchByNameResp,
  })),

  on(searchAction.getContactListFail, (state, { error }) => ({
    ...state,
    error,
  })),

  // Get Single contact profile
  on(searchAction.getContact, (state,) => ({
    ...state,
  })),

  on(searchAction.getContactSuccess, (state, { contact }) => ({
    ...state,
    contact,
  })),

  on(searchAction.getContactFail, (state, { error }) => ({
    ...state,
    error,
  })),

  // Company list on name searching
  on(searchAction.getCompanyList, (state,) => ({
    ...state,
  })),

  on(searchAction.getCompanyListSuccess, (state, { companySearchByNameResp }) => ({
    ...state,
    companySearchByNameResp,
  })),

  on(searchAction.getCompanyListFail, (state, { error }) => ({
    ...state,
    error,
  })),

  // Get Single company profile
  on(searchAction.getCompany, (state,) => ({
    ...state,
  })),

  on(searchAction.getCompanySuccess, (state, { company }) => ({
    ...state,
    company,
  })),

  on(searchAction.getCompanyFail, (state, { error }) => ({
    ...state,
    error,
  })),

  // This returns the selected profile and its type
  on(searchAction.pickSelectedProfile, (state, { payload }) => ({
    ...state,
    payload,
  })),

  // This returns the selected tab type (Contacts or Accounts) on search page
  on(searchAction.setProfileTypeOnSearchPage, (state, { searchTabType }) => ({
    ...state,
    searchTabType,
  })),

  // Clear search result from suggestions
  on(searchAction.clearSearchByNameSuggestions, (state, { clearResult }) => ({
    ...state,
    clearResult
  })),

  // Contact advance result
  on(searchAction.onContactAdvanceSearchSuccess, (state, { contactCriteriaSearchResult }) => ({
    ...state,
    contactCriteriaSearchResult
  })),

  // Company Names List
  on(searchAction.fetchCompanyNameListsSuccess, (state, { companyNameList }) => ({
    ...state,
    companyNameList
  })),

  // Job-functions
  on(searchAction.fetchJobFunctionsSuccess, (state, { jobFunctions }) => ({
    ...state,
    jobFunctions
  })),

  // Seniorities
  on(searchAction.fetchSenioritiesSuccess, (state, { seniorities }) => ({
    ...state,
    seniorities
  })),

  // Skills(keyword)
  on(searchAction.fetchSkillsSuccess, (state, { skills }) => ({
    ...state,
    skills
  })),

  // Company Locations
  on(searchAction.fetchCompanyLocationsSuccess, (state, { locations }) => ({
    ...state,
    locations
  })),

  // Industries
  on(searchAction.fetchIndustriesSuccess, (state, { industries }) => ({
    ...state,
    industries
  })),

  // Technologies
  on(searchAction.fetchTechnologiesSuccess, (state, { technologies }) => ({
    ...state,
    technologies
  })),

  // companyAdvanceSearch
  on(searchAction.companyAdvanceSearchSuccess, (state, { companyCriteriaSearchResult }) => ({
    ...state,
    companyCriteriaSearchResult
  })),

  // contact TP Search
  on(searchAction.getContactTpSearchListSuccess, (state, { contactTpSearchByNameResp }) => ({
    ...state,
    contactTpSearchByNameResp,
  })),

  // contact TP Search Error
  on(searchAction.getContactTpSearchError, (state, { contactTpSearchError }) => ({
    ...state,
    contactTpSearchError,
  }))
);

export function searchReducer(state: SearchState = initialSearchState, action: Action) {
  return createSearchReducer(state, action);
}
