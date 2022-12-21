import { CompanyCriteria } from "@app/shared/models/contacts/contact-search/company-criteria.model";

export class ContactSearchCriteria {  
  seniorities? = [];
  departments? = [];
  keywords? = [];
  location_exclusions? = [];
  locations? = [];
  company_ids? = [];
  titles? = [];
  title_exclusions? = [];
  tenures? = [];
  contact_skills? = [];
  company_tenure? = [];
  position_tenure? = [];
  is_current?: boolean;
  high_quality?: false;
  company_criteria?: CompanyCriteria;
  email?: boolean;
  phone?: boolean;
  valid_email?: boolean;
  with_profile? = [];
}
