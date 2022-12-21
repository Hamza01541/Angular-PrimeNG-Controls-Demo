import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HelperService } from '@app/core/services';
import { UtilitiesService } from '@app/core/services/utilities/utilities.service';
import { SearchUtilityService } from '@app/modules/search/pages';
import { getCompanyNameList, getIndustries, getJobFunctions, getLocations, getSeniorities, getSkills } from '@app/modules/search/store/search.selectors';
import { SearchState } from '@app/modules/search/store/search.state';
import { CompanyCriteria, ContactSearchCriteria, Persona, PersonCriteria } from '@app/shared/models';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'contact-filters',
  templateUrl: './contact-filters.component.html',
  styleUrls: ['./contact-filters.component.scss']
})
export class ContactFiltersComponent implements OnInit {
  selectedCompanyTypeFilter: any;
  companyFilters: Array<any>;
  keyword: string;
  companyNameList: Array<any>;
  totalCompanyCriteria: number;
  jobFunctions: Array<any>;
  selectedJobFunctions: Array<any>;
  seniorities: Array<any>;
  selectedSeniorities: Array<any>;
  skills: Array<any>;
  selectedSkills: Array<any>;
  locations: Array<any>;
  selectedCompanyLocations: Array<any>;
  industries: Array<any>;
  selectedCompanyIndustries: Array<any>;
  employeeRanges: Array<any>;
  selectedEmployeeRanges: Array<any>;
  profileKeywords: Array<any>;
  selectedProfileKeyword: Array<any>;
  contactLocations: Array<any>;
  selectedContactLocations: Array<any>;
  companyTenure: Array<any>;
  selectedCompanyTenure: Array<any>;
  positionTenure: Array<any>;
  selectedPositionTenure: Array<any>;
  showSavedPersonaLists: boolean;
  subscriptionList$: Array<Subscription> = [];
  showMoreFilters: boolean = false;
  selectedCompaniesByName: Array<any>;
  hasEmailAddress: boolean = false;
  hasVerifiedEmailAddress: boolean = false;
  hasPhoneNumber: boolean = false;
  hasSocialProfile: boolean = false;
  numberOfAccounts: number = 10;
  hidePositionTenures: boolean;
  hideCompanyTenures: boolean;
  hideSkills: boolean;
  hideProfileKeywords: boolean;
  contactCriteria: ContactSearchCriteria;
  companyCriteria: CompanyCriteria;

  @Output() onApplySavedPersonaFromFilter = new EventEmitter<Persona>();
  @Output() onEmitContactCriteria = new EventEmitter<ContactSearchCriteria>();

  constructor(private searchStore: Store<SearchState>,
    private helperService: HelperService,
    private utilityService: UtilitiesService,
    private searchUtility: SearchUtilityService) {
    this.contactCriteria = new ContactSearchCriteria();
    this.companyCriteria = new CompanyCriteria();
  }

  ngOnInit(): void {
    this.selectedCompanyTypeFilter = { name: 'select', id: 'none' };
    this.fetchCompanyFilterType();
    this.fetchCompanyNameList();
    this.fetchJobFunctions();
    this.fetchSeniorities();
    this.fetchSkills();
    this.fetchLocations();
    this.fetchIndustries();
    this.fetchEmployeeRanges();
    this.fetchTenures();
  }

  /**
   * This will emit event for adding persona criteria.
   * @param selectedPersona 
   */
  onApplySavedPersonaCriteria(selectedPersona: Persona) {
    this.onApplySavedPersonaFromFilter.emit(selectedPersona);
  }

  /**
   * Set company filters type.
   * @param option 
   */
  onSelectedCompanyFilter(option: any) {
    switch (option.id) {
      case 'filter_company_by_criteria':
        // Clear previous company filters
        break;
      case 'filter_company_by_name':
        // Clear previous company filters
        break;
      default:
        break;
    }
  }

  /**
   * Fetching company filters type. 
   */
  fetchCompanyFilterType() {
    this.companyFilters = this.searchUtility.getCompanyFilters();
  }

  /**
   * Fetches company Name List from store.
   */
  fetchCompanyNameList() {
    this.subscriptionList$.push(
      this.searchStore
        .pipe(select(getCompanyNameList))
        .subscribe((response: any) => {
          if (response && response.length) {
            this.companyNameList = response;
          }
        })
    );
  }

  /**
   * Gets Job-functions lists for contact criteria.
   */
  fetchJobFunctions() {
    this.subscriptionList$.push(
      this.searchStore
        .pipe(select(getJobFunctions))
        .subscribe((response: any) => {
          if (response && response.length) {
            this.jobFunctions = response;
          }
        })
    );
  }

  /**
   * Gets Seniority list for contact criteria.
   */
  fetchSeniorities() {
    this.subscriptionList$.push(
      this.searchStore
        .pipe(select(getSeniorities))
        .subscribe((response: any) => {
          if (response && response.length) {
            this.seniorities = response;
          }
        })
    );
  }

  /**
   * Gets Skills list for contact criteria.
   */
  fetchSkills() {
    this.subscriptionList$.push(
      this.searchStore
        .pipe(select(getSkills))
        .subscribe((response: any) => {
          if (response && response.length) {
            this.skills = this.helperService.safeCopy(response);
            this.profileKeywords = this.helperService.safeCopy(response);
          }
        })
    );
  }

  /**
   * Gets locations from store.
   */
  fetchLocations() {
    this.subscriptionList$.push(
      this.searchStore
        .pipe(select(getLocations))
        .subscribe((response: any) => {
          if (response && response.length) {
            this.locations = this.helperService.safeCopy(response);
            this.contactLocations = this.helperService.safeCopy(response);
          }
        })
    );
  }

  /**
   * Gets industries from store.
   */
  fetchIndustries() {
    this.subscriptionList$.push(
      this.searchStore
        .pipe(select(getIndustries))
        .subscribe((response: any) => {
          if (response && response.length) {
            this.industries = response;
          }
        })
    );
  }

  /**
   * Fetch employee range lists
   */
  fetchEmployeeRanges() {
    this.employeeRanges = this.utilityService.getEmployeeRanges();
  }

  /**
   * Fetch position and company tenures lists.
   */
  fetchTenures() {
    this.positionTenure = this.helperService.safeCopy(this.utilityService.buildTenure());
    this.companyTenure = this.helperService.safeCopy(this.utilityService.buildTenure());
  }

  /**
   * Sends selected company filter to Search Page.
   * @param companies 
   */
  onSelectedCompaniesByName(companies: any) {
    this.selectedCompaniesByName = companies;
    this.contactCriteria.company_ids = this.helperService.retrieveKeys(companies, 'id');
    this.buildContactCriteria();
  }

  /**
  * Sends selected company locations filter to Search Page.
  * @param locations 
  */
  onSelectedCompanyLocations(locations: any) {
    this.selectedCompanyLocations = locations;
    this.companyCriteria.locations = locations;
    this.contactCriteria.company_criteria = this.companyCriteria;
    this.buildContactCriteria();
  }

  /**
   * Sends selected industries filter to Search Page.
   * @param industries 
   */
  onSelectedCompanyIndustries(industries: any) {
    this.selectedCompanyIndustries = industries;
    this.companyCriteria.industries = this.helperService.retrieveKeys(industries, 'id');
    this.contactCriteria.company_criteria = this.companyCriteria;
    this.buildContactCriteria();
  }

  /**
   * Sends selected employeeRange filter to Search Page.
   * @param employeeRange 
   */
  onSelectedEmployeeRanges(employeeRange: any) {
    this.selectedEmployeeRanges = employeeRange;
    this.companyCriteria.employee = this.utilityService.handleRanges(employeeRange);
    this.contactCriteria.company_criteria = this.companyCriteria;
    this.buildContactCriteria();
  }

  /**
  * Sends selected seniorities filter to Search Page.
  * @param seniorities 
  */
  onSelectedSeniorities(seniorities: any) {
    this.selectedSeniorities = seniorities;
    this.contactCriteria.seniorities = this.helperService.retrieveKeys(seniorities, 'id');
    this.buildContactCriteria();
  }

  /**
   * Sends selected JobFunction filter to Search Page.
   * @param jobFunctions 
   */
  onSelectedJobFunctions(jobFunctions: any) {
    this.selectedJobFunctions = jobFunctions;
    this.contactCriteria.departments = this.helperService.retrieveKeys(jobFunctions, 'id');
    this.buildContactCriteria();
  }

  /**
   * Sends selected skills filter to Search Page.
   * @param skills 
   */
  onSelectedSkills(skills: any) {
    this.hideProfileKeywords = true;
    this.selectedSkills = skills;
    this.contactCriteria.contact_skills = this.helperService.retrieveKeys(skills, 'id');
    this.hideProfileKeywords = this.selectedSkills.length !== 0;
    this.buildContactCriteria();
  }

  /**
   * Sends selected profileKeywords filter to Search Page.
   * @param profileKeywords 
   */
  onSelectedProfileKeywords(profileKeywords: any) {
    this.hideSkills = true;
    this.selectedProfileKeyword = profileKeywords;
    this.contactCriteria.keywords = this.helperService.retrieveKeys(profileKeywords, 'id');
    this.hideSkills = this.selectedProfileKeyword.length !== 0;
    this.buildContactCriteria();
  }

  /**
   * Sends selected contactLocations filter to Search Page.
   * @param contactLocations 
   */
  onSelectedContactLocations(contactLocations: any) {
    this.selectedContactLocations = contactLocations;
    this.contactCriteria.locations = contactLocations;
    this.buildContactCriteria();
  }

  /**
   * Send selected company tenure criteria
   * @param companyTenure 
   */
  onSelectedCompanyTenure(companyTenure: any) {
    this.hidePositionTenures = true;
    this.selectedCompanyTenure = companyTenure;
    this.contactCriteria.company_tenure = companyTenure;
    this.hidePositionTenures = this.selectedCompanyTenure.length !== 0;
    this.buildContactCriteria();
  }

  /**
   * Send selected Position tenure criteria
   * @param positionTenure 
   */
  onSelectedPositionTenure(positionTenure: any) {
    this.hideCompanyTenures = true;
    this.selectedPositionTenure = positionTenure;
    this.contactCriteria.position_tenure = positionTenure;
    this.hideCompanyTenures = this.selectedPositionTenure.length !== 0;
    this.buildContactCriteria();
  }

  /**
   * Sends the selected Max companies.
   * @param value 
   */
  onMaxCompanies(value: any) {
   this.companyCriteria.max_companies = this.numberOfAccounts;
   this.contactCriteria.company_criteria = this.companyCriteria;
  }

  /**
   * Apply Email settings
   */
  onHasEmailAddress() {
    this.contactCriteria.email = this.hasEmailAddress;
    this.buildContactCriteria();
  }

  /**
   * Apply Verified Email settings
   */
  onHasVerifiedEmailAddress() {
    this.contactCriteria.valid_email = this.hasVerifiedEmailAddress;
    this.buildContactCriteria();
  }

  /**
   * Apply Phone settings
   */
  onHasPhoneNumber() {
    this.contactCriteria.phone = this.hasPhoneNumber;
    this.buildContactCriteria();
  }

  /**
   * Apply social profile settings
   */
  onHasSocialProfile() {
    this.contactCriteria.with_profile = this.hasSocialProfile ? ["linkedin", "facebook", "twitter"] : [];
    this.buildContactCriteria();
  }

  /**
  * This handle show more & less filters 
  */
  toggleMore() {
    this.showMoreFilters = !this.showMoreFilters;
  }

  /**
   * Check wether the criteria has been selected or not.
   * @returns boolean
   */
  isCompanyCriteriaSelected() {
    return this.selectedCompanyLocations?.length || this.selectedCompanyIndustries?.length
      || this.selectedEmployeeRanges?.length || this.selectedCompaniesByName?.length;
  }

  /**
   * Returns the number of selected settings
   * @returns 
   */
  getSettingCount() {
    let count = 0;
    this.hasEmailAddress ? count++ : '';
    this.hasPhoneNumber ? count++ : '';
    this.hasSocialProfile ? count++ : '';
    this.hasVerifiedEmailAddress ? count++ : '';
    return count;
  }

  /**
   * clear selected position tenure
   */
  clearPositionTenure() {
    this.onSelectedPositionTenure([]);
    this.positionTenure = this.utilityService.buildTenure();
  }

  /**
   * clear selected company tenure
   */
  clearCompanyTenure() {
    this.onSelectedCompanyTenure([]);
    this.companyTenure = this.utilityService.buildTenure();
  }

  /**
   * Clears Selected Skills
   */
  clearSkills() {
    this.onSelectedSkills([]);
    this.fetchSkills();
  }

  /**
   * Clears selected profile Keywords
   */
  clearProfileKeywords() {
    this.onSelectedProfileKeywords([]);
    this.fetchSkills();
  }

  /**
   * Build Contact criteria
   */
  buildContactCriteria() {
    this.onEmitContactCriteria.emit(this.contactCriteria);
  }

  /**
  * Get the Selected Persona
  * @param selectedPersona 
  */
  fetchCriteriaFromSavedPersona(selectedPersona: Persona) {
    if (selectedPersona == null) {
      this.contactCriteria = new ContactSearchCriteria();
      this.buildContactCriteria();
    } else {
      this.injectSavedPersonaCriteria(selectedPersona.criteria);
    }
  }

  /**
   * Inject Persona Criteria 
   * @param type 
   * @param criteria 
   */
  injectSavedPersonaCriteria(criteria: PersonCriteria) {
    if (criteria) {
      this.contactCriteria.keywords = criteria.keywords;
      this.contactCriteria.departments = this.helperService.retrieveKeys(criteria.departments, 'id');
      this.contactCriteria.seniorities = this.helperService.retrieveKeys(criteria.seniorities, 'id');
      this.contactCriteria.location_exclusions = criteria.location_exclusions || [];
      this.contactCriteria.locations = criteria.locations || [];
      this.contactCriteria.titles = criteria.titles || [];
      this.contactCriteria.title_exclusions = criteria.title_exclusions || [];
      this.contactCriteria.tenures = criteria.tenures;
      this.contactCriteria.contact_skills = criteria.contact_skills;
      this.contactCriteria.company_tenure = criteria.company_tenure;
      this.contactCriteria.position_tenure = criteria.position_tenure;
    }
  }

  ngOnDestroy() {
    this.subscriptionList$.forEach(sub$ => { if (sub$) { sub$.unsubscribe(); } });
  }

}
