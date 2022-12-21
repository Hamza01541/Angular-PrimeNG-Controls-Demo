import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { clearSearchByNameSuggestions, setProfileTypeOnSearchPage } from '@app/modules/search/store/search.actions';
import { SearchState } from '@app/modules/search/store/search.state';
import { CompanyCriteria, ContactSearchCriteria, Persona, ProfileType } from '@app/shared/models';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'search-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  isAccountSelected: boolean;
  isContactSelected: boolean;
  subscriptionList$: Array<Subscription> = [];
  contactCriteria: ContactSearchCriteria;
  companyCriteria: CompanyCriteria;

  @Output() onEmitContactSearchCriteria = new EventEmitter<ContactSearchCriteria>();
  @Output() onEmitCompanySearchCriteria = new EventEmitter<CompanyCriteria>();
  @Output() setSelectedSearchTab = new EventEmitter<any>();

  constructor(private searchStore: Store<SearchState>) {
    this.contactCriteria = new ContactSearchCriteria();
    this.companyCriteria = new CompanyCriteria();
  }

  ngOnInit(): void {
    this.isContactSelected = true;
  }

  /**
   * This function generates event based on selected tab.
   * event.index === 0 indicated 'Contact' tab selection.
   * event.index === 1 indicated 'Company' tab selection.
   * @param event 
   */
  onTabChange(event: any) {
    if (event.index) {
      this.isAccountSelected = true;
      this.isContactSelected = false;
      this.searchStore.dispatch(clearSearchByNameSuggestions({ clearResult: true }));
      this.searchStore.dispatch(setProfileTypeOnSearchPage({ searchTabType: ProfileType.Accounts }));
      this.setSelectedSearchTab.emit(ProfileType.Accounts);
    } else {
      this.isContactSelected = true;
      this.isAccountSelected = false;
      this.searchStore.dispatch(clearSearchByNameSuggestions({ clearResult: true }));
      this.searchStore.dispatch(setProfileTypeOnSearchPage({ searchTabType: ProfileType.Contacts }));
      this.setSelectedSearchTab.emit(ProfileType.Contacts);
    }
  }

  /**
   * Pass the contact criteria to search page
   * @param criteria 
   */
  applySelectedContactCriteria(criteria: ContactSearchCriteria) {
    this.onEmitContactSearchCriteria.emit(criteria);
  }

  /**
   * Pass the company criteria to search page
   * @param criteria 
   */
  applySelectedCompanyCriteria(criteria: CompanyCriteria) {
    this.onEmitCompanySearchCriteria.emit(criteria);
  }

  ngOnDestroy() {
    this.subscriptionList$.forEach(sub$ => { if (sub$) { sub$.unsubscribe(); } });
  }
}
