import { Component, OnInit } from '@angular/core';
import { HelperService } from '@app/core/services';
import { CompanyCriteria, ContactSearchCriteria, Persona, ProfileType } from '@app/shared/models';
import { getPersonaList } from '@app/shared/stores/persona/persona.actions';
import { PersonaState } from '@app/shared/stores/persona/persona.state';
import { Store } from '@ngrx/store';
import {
  companyAdvanceSearch,
  fetchCompanyLocations,
  fetchCompanyNameLists,
  fetchIndustries,
  fetchJobFunctions,
  fetchSeniorities,
  fetchSkills,
  fetchTechnologies,
  onContactAdvanceSearch
} from '@app/modules/search/store/search.actions';
import { SearchState } from '@app/modules/search/store/search.state';
import { MessageService } from 'primeng/api';
import { SearchUtilityService } from '@app/modules/search/search-utilities/search-utility.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  isFilterBarToggled: boolean = false;
  contactCriteria: ContactSearchCriteria;
  companyCriteria: CompanyCriteria;
  isCompanyCriteriaPresent: boolean;
  isContactCriteriaPresent: boolean;
  isContactTab: boolean;
  isCompanyTab: boolean;
  constructor(
    private personaStore: Store<PersonaState>,
    private helperService: HelperService,
    private searchStore: Store<SearchState>,
    private searchUtility: SearchUtilityService,
    private messageService: MessageService) {
    this.contactCriteria = new ContactSearchCriteria();
    this.companyCriteria = new CompanyCriteria();
  }

  ngOnInit(): void {
    this.personaStore.dispatch(getPersonaList({ startIndex: 0 }));
    this.searchStore.dispatch(fetchCompanyNameLists());
    this.searchStore.dispatch(fetchJobFunctions());
    this.searchStore.dispatch(fetchSeniorities());
    this.searchStore.dispatch(fetchSkills());
    this.searchStore.dispatch(fetchCompanyLocations());
    this.searchStore.dispatch(fetchIndustries());
    this.searchStore.dispatch(fetchTechnologies());
  }

  /**
   * Filter Menu hide show.
   * @param toggle 
   */
  filterBarToggle(toggle: boolean) {
    this.isFilterBarToggled = !toggle;
  }

  /**
   * Gets Contact Search results based on criteria. 
   */
  advanceSearch() {
    this.contactCriteria.high_quality = false;
    this.contactCriteria.is_current = true;
    let checkCompanyCriteria = this.contactCriteria.company_criteria;
    let payload = { 'criteria': this.contactCriteria };
    payload = this.helperService.cleanJson(payload);

    // Delete company criteria key if empty.
    if (checkCompanyCriteria) {
      if (Object.keys(checkCompanyCriteria).length == 0) {
        delete this.contactCriteria.company_criteria;
      }
    }

    if (this.isValidContactCriteria()) {
      this.searchStore.dispatch(onContactAdvanceSearch({ criteriaPayload: payload }));
    } else if (!this.isContactCriteriaPresent) {
      this.displayMissingCriteriaMessage('Contact');
    } else if (!this.isCompanyCriteriaPresent) {
      this.displayMissingCriteriaMessage('Company');
    } else {
      this.displayMissingCriteriaMessage('Search');
    }
  }

  /**
   * This validates weather criteria is valid or not.
   * @returns boolean
   */
  isValidContactCriteria() {
    let isCompaniesSelected = this.contactCriteria.company_ids && this.contactCriteria.company_ids.length;
    this.isCompanyCriteriaPresent = this.contactCriteria.company_criteria ? true : false;
    this.isContactCriteriaPresent = this.searchUtility.validateContactCriteria(this.contactCriteria);

    if ((isCompaniesSelected || this.isCompanyCriteriaPresent) && this.isContactCriteriaPresent) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Displays message for missing criteria.
   * @param type 
   */
  displayMissingCriteriaMessage(type: any) {
    this.messageService.add({
      severity: 'error',
      detail: `Please Select ${type} Criteria`,
    });
  }

  /**
   * Reads Contact criteria
   * @param criteria 
   */
  applyContactSearchCriteria(criteria: ContactSearchCriteria) {
    this.contactCriteria = criteria;
  }

  /**
   * Reads Company Criteria
   * @param criteria 
   */
  applyCompanySearchCriteria(criteria: CompanyCriteria) {
    this.companyCriteria = criteria;
  }

  /**
   * Gets Company Search results based on criteria. 
   */
  companyAdvanceSearch() {
    let payload = { 'criteria': this.companyCriteria };
    payload = this.helperService.cleanJson(payload);
    if (Object.keys(payload.criteria).length) {
      this.searchStore.dispatch(companyAdvanceSearch({ criteriaPayload: payload }));
    } else {
      this.displayMissingCriteriaMessage('Search');
    }

  }

  /**
   * Determines type of tab selected by user.
   * @param type 
   */
  getSelectedSearchTab(type: any) {
    switch (type) {
      case 'Accounts':
        this.isContactTab = false;
        this.isCompanyTab = true;
        break;
      case 'Contacts':
        this.isCompanyTab = false;
        this.isContactTab = true;
        break;
    }
  }

}
