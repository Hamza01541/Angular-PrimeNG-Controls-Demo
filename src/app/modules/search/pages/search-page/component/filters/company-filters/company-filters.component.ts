import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HelperService } from '@app/core/services';
import { UtilitiesService } from '@app/core/services/utilities/utilities.service';
import { SearchUtilityService } from '@app/modules/search/pages';
import { getIndustries, getLocations, getSkills, getTechnologies } from '@app/modules/search/store/search.selectors';
import { SearchState } from '@app/modules/search/store/search.state';
import { CompanyCriteria, ContactSearchCriteria } from '@app/shared/models';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'company-filters',
  templateUrl: './company-filters.component.html',
  styleUrls: ['./company-filters.component.scss']
})
export class CompanyFiltersComponent implements OnInit {
  keyword: string;
  subscriptionList$: Array<Subscription> = [];
  industries: Array<any>;
  selectedIndustries: Array<any>;
  employeeRanges: Array<any>;
  selectedEmployeeRanges: Array<any>;
  revenueRanges: Array<any>;
  selectedRevenueRanges: Array<any>;
  locations: Array<any>;
  selectedLocations: Array<any>;
  companyTypes: Array<any>;
  selectedCompanyTypes: Array<any>;
  technologies: Array<any>;
  selectedTechnologies: Array<any>;
  companyKeywords: Array<any>;
  selectedKeywords: Array<any>;
  showMoreFilters: boolean = false;
  companyCriteria: CompanyCriteria;

  @Output() onEmitCompanyCriteria = new EventEmitter<CompanyCriteria>();

  constructor(private searchStore: Store<SearchState>,
    private helperService: HelperService,
    private utilityService: UtilitiesService) {
    this.companyCriteria = new CompanyCriteria();
  }

  ngOnInit(): void {
    this.fetchIndustries();
    this.fetchEmployeeRanges();
    this.fetchLocations();
    this.fetchTechnologies();
    this.fetchKeywords();
    this.fetchRevenueRanges();
    this.fetchCompanyTypes();
  }

  /**
   * Fetches fetchTechnologies from store.
   */
  fetchTechnologies() {
    this.subscriptionList$.push(
      this.searchStore
        .pipe(select(getTechnologies))
        .subscribe((response: any) => {
          if (response && response.length) {
            this.technologies = response;
          }
        })
    );
  }

  /**
   * Gets keywords list for search criteria.
   */
  fetchKeywords() {
    this.subscriptionList$.push(
      this.searchStore
        .pipe(select(getSkills))
        .subscribe((response: any) => {
          if (response && response.length) {
            this.companyKeywords = this.helperService.safeCopy(response);
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
   * Fetch revenue range lists
   */
  fetchRevenueRanges() {
    this.revenueRanges = this.utilityService.getRevenueRanges();
  }

  fetchCompanyTypes() {
    this.companyTypes = this.utilityService.getCompanyTypes();
  }

  /**
   * Sends selected industries filter to Search Page.
   * @param industries 
   */
  onSelectedIndustries(industries: any) {
    this.selectedIndustries = industries;
    this.companyCriteria.industries = this.helperService.retrieveKeys(industries, 'id');
    this.buildCompanyCriteria();
  }

  /**
   * Sends selected employeeRange filter to Search Page.
   * @param employeeRange 
   */
  onSelectedEmployeeRanges(employeeRange: any) {
    this.selectedEmployeeRanges = employeeRange;
    this.companyCriteria.employee = this.utilityService.handleRanges(employeeRange);
    this.buildCompanyCriteria();
  }

  /**
   * Sends selected Revenue range filter to Search Page.
   * @param revenueRanges 
   */
  onSelectedRevenueRanges(revenueRanges: any) {
    this.selectedRevenueRanges = revenueRanges;
    this.companyCriteria.revenue = this.utilityService.handleRanges(revenueRanges);
    this.buildCompanyCriteria();
  }

  /**
   * Sends selected Locations filter to Search Page.
   * @param locations 
   */
  onSelectedLocations(locations: any) {
    this.selectedLocations = locations;
    this.companyCriteria.locations = locations;
    this.buildCompanyCriteria();
  }

  /**
   * Sends selected Company Type filter to Search Page.
   * @param companyTypes 
   */
  onSelectedCompanyTypes(companyTypes: any) {
    this.selectedCompanyTypes = companyTypes;
    this.companyCriteria.company_types = this.helperService.retrieveKeys(companyTypes, 'name');;
    this.buildCompanyCriteria();
  }

  /**
   * Sends selected Technologies filter to Search Page.
   * @param technologies 
   */
  ontSelectedTechnologies(technologies: any) {
    this.selectedTechnologies = technologies;
    this.companyCriteria.technologies = this.helperService.retrieveKeys(technologies, 'name');
    this.buildCompanyCriteria();
  }

  /**
   * Sends selected keywords filter to Search Page.
   * @param Keywords 
   */
  onSelectedKeywords(profileKeywords: any) {
    this.selectedKeywords = profileKeywords;
    this.companyCriteria.categories = this.helperService.retrieveKeys(profileKeywords, 'name');
    this.buildCompanyCriteria();
  }

  /**
  * This handle show more & less filters 
  */
  toggleMore() {
    this.showMoreFilters = !this.showMoreFilters;
  }

  /**
   * Sends criteria to search page.
   */
  buildCompanyCriteria() {
    this.onEmitCompanyCriteria.emit(this.companyCriteria);
  }

  ngOnDestroy() {
    this.subscriptionList$.forEach(sub$ => { if (sub$) { sub$.unsubscribe(); } });
  }
}
