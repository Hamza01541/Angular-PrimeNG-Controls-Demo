import { CompanySearchByNameResponse } from "@app/shared/models/company/company-search-by-name.model";
import { Company } from "@app/shared/models/company/company.model";
import { ContactSearchByNameResponse } from "@app/shared/models/contacts/contact-search/contact-search-by-name.model";
import { ContactTpSearchByNameResponse } from "@app/shared/models/contacts/contact-search/contact-tp-search-by-name.model";
import { Contact } from "@app/shared/models/contacts/contact.model";
import { createAction, props } from "@ngrx/store";

// Getting contact lists upon search term provided
export const getContactList = createAction(
  '[getContactList] getContactList',
  props<{ searchText: string }>()
);

export const getContactListSuccess = createAction(
  '[getContactList] getContactListSuccessfully',
  props<{ contactSearchByNameResp: ContactSearchByNameResponse }>()
);

export const getContactListFail = createAction(
  '[getContactList] getContactListFail',
  props<{ error: any }>()
);

/**
 * Clear the contact list from store.
 */
export const clearContactLists = createAction(
  '[clearContactLists] clearContactLists'
);

// Getting Single contact
export const getContact = createAction(
  '[getContact] getContact',
  props<{ contactId: string }>()
);

export const getContactSuccess = createAction(
  '[getContact] getContactSuccess',
  props<{ contact: Contact }>()
);

export const getContactFail = createAction(
  '[getContact] getContactFail',
  props<{ error: any }>()
);

// Getting Company lists upon search term provided
export const getCompanyList = createAction(
  '[getCompanyList] getCompanyList',
  props<{ searchText: string }>()
);

export const getCompanyListSuccess = createAction(
  '[getCompanyList] getCompanyListSuccessfully',
  props<{ companySearchByNameResp: CompanySearchByNameResponse }>()
);

export const getCompanyListFail = createAction(
  '[getCompanyList] getCompanyListFail',
  props<{ error: any }>()
);

// Getting Single contact
export const getCompany = createAction(
  '[getCompany] getCompany',
  props<{ companyId: string }>()
);

export const getCompanySuccess = createAction(
  '[getCompany] getCompanySuccess',
  props<{ company: Company }>()
);

export const getCompanyFail = createAction(
  '[getCompany] getCompanyFail',
  props<{ error: any }>()
);

// Clear the company list from store.
export const clearCompanyLists = createAction(
  '[clearCompanyLists] clearCompanyLists'
);

// Gets the user selected profile from search by name results.
export const pickSelectedProfile = createAction(
  '[pickSelectedProfile] pickSelectedProfile',
  props<{ payload: any }>()
);

// Gets the user selected profile from search by name results.
export const setProfileTypeOnSearchPage = createAction(
  '[setProfileTypeOnSearchPage] setProfileTypeOnSearchPage',
  props<{ searchTabType: string }>()
);

// Clears the search suggestions.
export const clearSearchByNameSuggestions = createAction(
  '[clearSearchByNameSuggestions] clearSearchByNameSuggestions',
  props<{ clearResult: boolean }>()
);

// Clear the Quick view store.
export const ClearQuickViewStore = createAction(
  '[Search] ClearQuickViewStore'
);

// Get criteria for contact advance search.
export const onContactAdvanceSearch = createAction(
  '[Search] onContactAdvanceSearch',
  props<{ criteriaPayload: any }>()
);

// Returns results for given contact criteria.
export const onContactAdvanceSearchSuccess = createAction(
  '[Search] onContactAdvanceSearchSuccess',
  props<{ contactCriteriaSearchResult: Contact[] }>()
);

// Fetch Companies List
export const fetchCompanyNameLists = createAction(
  '[Search] fetchCompanyNameLists'
);

export const fetchCompanyNameListsSuccess = createAction(
  '[Search] fetchCompanyNameListsSuccess',
  props<{ companyNameList: [] }>()
);


// Fetch Job-Functions
export const fetchJobFunctions = createAction(
  '[Search] fetchJobFunctions'
);

export const fetchJobFunctionsSuccess = createAction(
  '[Search] fetchJobFunctionsSuccess',
  props<{ jobFunctions: [] }>()
);

// Fetch Seniorities
export const fetchSeniorities = createAction(
  '[Search] fetchSeniorities'
);

export const fetchSenioritiesSuccess = createAction(
  '[Search] fetchSenioritiesSuccess',
  props<{ seniorities: [] }>()
);

// Fetch Skills(Keyword)
export const fetchSkills = createAction(
  '[Search] fetchSkills'
);

export const fetchSkillsSuccess = createAction(
  '[Search] fetchSkillsSuccess',
  props<{ skills: [] }>()
);

// Fetch CompanyLocations
export const fetchCompanyLocations = createAction(
  '[Search] fetchCompanyLocations'
);

export const fetchCompanyLocationsSuccess = createAction(
  '[Search] fetchCompanyLocationsSuccess',
  props<{ locations: [] }>()
);

// Fetch CompanyLocations
export const fetchIndustries = createAction(
  '[Search] fetchIndustries'
);

export const fetchIndustriesSuccess = createAction(
  '[Search] fetchIndustriesSuccess',
  props<{ industries: [] }>()
);

// Fetch Technologies
export const fetchTechnologies = createAction(
  '[Search] technologies'
);

export const fetchTechnologiesSuccess = createAction(
  '[Search] fetchTechnologiesSuccess',
  props<{ technologies: [] }>()
);

// Fetch Company criteria based result.
export const companyAdvanceSearch = createAction(
  '[Search] companyAdvanceSearch',
  props<{ criteriaPayload: any }>()
);

export const companyAdvanceSearchSuccess = createAction(
  '[Search] companyAdvanceSearchSuccess',
  props<{ companyCriteriaSearchResult: Company[] }>()
);

// Getting contact TP search by name
export const getContactTpSearchList = createAction(
  '[Search] getContactTpSearchList',
  props<{ searchText: string }>()
);

export const getContactTpSearchListSuccess = createAction(
  '[Search] getContactTpSearchListSuccess',
  props<{ contactTpSearchByNameResp: ContactTpSearchByNameResponse }>()
);

export const getContactTpSearchError = createAction(
  '[Search] getContactTpSearchError',
  props<{ contactTpSearchError: any }>()
);

// getContactPlaceHolder
export const getContactPlaceHolder = createAction(
  '[Search] getContactPlaceHolder',
  props<{ payload: any }>()
);
