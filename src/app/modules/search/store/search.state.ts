import { ProfileType } from "@app/shared/models";
import { CompanySearchByNameResponse } from "@app/shared/models/company/company-search-by-name.model";
import { Company } from "@app/shared/models/company/company.model";
import { ContactSearchByNameResponse } from "@app/shared/models/contacts/contact-search/contact-search-by-name.model";
import { ContactTpSearchByNameResponse } from "@app/shared/models/contacts/contact-search/contact-tp-search-by-name.model";
import { Contact } from "@app/shared/models/contacts/contact.model";

export interface SearchState {
  contact: Contact;
  company: Company;
  payload: any;
  searchTabType: string;
  clearResult: boolean;
  contactCriteriaSearchResult: Contact[];
  companyNameList: [];
  jobFunctions: [];
  seniorities: [];
  skills: []
  locations: [];
  industries: []
  technologies: []
  companyCriteriaSearchResult: Contact[];
  contactSearchByNameResp: ContactSearchByNameResponse
  companySearchByNameResp: CompanySearchByNameResponse
  contactTpSearchByNameResp: ContactTpSearchByNameResponse
  contactTpSearchError: any
}

export const initialSearchState: SearchState = {
  contact: {},
  company: {},
  payload: {},
  searchTabType: ProfileType.Contacts,
  clearResult: false,
  contactCriteriaSearchResult: [],
  companyNameList: [],
  jobFunctions: [],
  seniorities: [],
  skills: [],
  locations: [],
  industries: [],
  technologies: [],
  companyCriteriaSearchResult: [],
  contactSearchByNameResp: { contacts: [], total: null },
  companySearchByNameResp: { companies: [], total: null },
  contactTpSearchByNameResp: { data: [], total: null },
  contactTpSearchError: null
};
