import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SearchState } from '@app/modules/search/store/search.state';
import { PlaceHolders } from '@app/shared/constants';
import { Contact, ProfileType } from '@app/shared/models';
import { select, Store } from '@ngrx/store';
import { Subscription, Subject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { clearCompanyLists, clearContactLists, getCompanyList, getContact, getContactList, getContactPlaceHolder, getContactTpSearchList, pickSelectedProfile } from '@app/modules/search/store/search.actions'
import { getCompanyListSelector, getContactListSelector, getContactSelector, getContactTpSearchSelector, onClearSearchByNameSuggestions, onContactTpSearchError } from '@app/modules/search/store/search.selectors';
import { HelperService } from '@app/core/services';
import { ContactSearchByNameResponse } from '@app/shared/models/contacts/contact-search/contact-search-by-name.model';
import { CompanySearchByNameResponse } from '@app/shared/models/company/company-search-by-name.model';
import { ContactTpSearchByNameResponse } from '@app/shared/models/contacts/contact-search/contact-tp-search-by-name.model';
import { MessageService } from 'primeng/api';
import { SearchUtilityService } from '@app/modules/search/pages';

@Component({
  selector: 'search-by-name-filters',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.scss']
})
export class SearchByNameComponent implements OnInit {
  @Input() type: string;
  @Input() onTabEvents: Observable<void>;
  searchText: string;
  results: Array<any>;
  isNoResultContacts: boolean;
  isNoResultCompanies: boolean;
  searchTextChanged = new Subject<string>();
  iconType = 'pi pi-plus';
  onSelectionOfContact = new Subject<string>();
  subscriptionList$: Array<Subscription> = [];
  defaultImage = PlaceHolders;
  noContactResultFoundPdl: boolean;
  showContactRateLimit: boolean;

  constructor(private helperService: HelperService,
    private searchStore: Store<SearchState>,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private searchUtilityService: SearchUtilityService,
  ) { }

  ngOnInit(): void {
    this.searchText = '';
    this.checkForTabEvents();
    this.fetchContactResults();
    this.fetchCompanyResults();
    this.onContactTpSearchError();
  }

  /**
   * Triggered when user enters search term.
   * @param searchTerm
   * @param keyCode
   */
  onSearchKey(searchTerm: any, keyCode: any) {
    if (this.validateKeyword(keyCode) && (searchTerm.length > 1 || +keyCode === 8)) {
      this.results = [];
      this.searchText = searchTerm;
      this.searchTextChanged.next(searchTerm);
    }
  }

  onClearSearch() {
    if (this.searchText === '') { this.clearResults() }
  }

  /**
   *  Make requests to Store for getting result based on search keyword.
   */
  onSearch() {
    switch (this.type) {
      case ProfileType.Contacts:
        this.searchStore.dispatch(getContactList({ searchText: this.searchText }));
        break;
      case ProfileType.Accounts:
        this.searchStore.dispatch(getCompanyList({ searchText: this.searchText }))
        break;
      default:
        break;
    }
  }

  /**
   *  Puts selected profile in result table.
   */
  getSelectedProfile(profile: any, index: any) {
    this.results[index].iconClass = 'pi pi-check';
    this.results[index].class = 'icon-color';
    this.searchStore.dispatch(pickSelectedProfile({ payload: { profile: profile, profile_type: this.type } }));
  }

  /**
   * Gets contact lists from store.
   */
  fetchContactResults() {
    this.subscriptionList$.push(
      this.searchStore
        .pipe(select(getContactListSelector))
        .subscribe((response: ContactSearchByNameResponse) => {
          if (response && response.total !== null) {
            if (response.total) {
              this.isNoResultContacts = false;
              this.results = response.contacts;
              response.contacts.forEach((contact: any) => {
                contact.iconClass = 'pi pi-plus';
                contact.class = '';
              });
            } else if (response.total == 0) {
              this.isNoResultContacts = true;
              this.results = [];
            }
          } else {
            this.results = [];
          }
        })
    );
  }

  /**
   * Gets contact lists from store.
   */
  fetchCompanyResults() {
    this.subscriptionList$.push(
      this.searchStore
        .pipe(select(getCompanyListSelector))
        .subscribe((response: CompanySearchByNameResponse) => {
          if (response && response.total !== null) {
            if (response.total) {
              this.isNoResultCompanies = false;
              this.results = response.companies;
              response.companies.forEach((company: any) => {
                company.iconClass = 'pi pi-plus';
                company.class = '';
              });
            } else if (response.total == 0) {
              this.isNoResultCompanies = true;
              this.results = [];
            }
          } else {
            this.results = [];
          }

        })
    );
  }

  /**
   * This is to validate that user should type only A-Z, a-z char's.
   */
  validateKeyword(keyCode: any) {
    if (((+keyCode > 64 && +keyCode < 91) || (+keyCode > 96 && +keyCode < 123) || +keyCode == 13) || +keyCode == 8) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Clearing existing search suggestions
   */
  onCloseSuggestions() {
    this.clearResults();
  }

  /**
   * Returns last updated status
   */
  getLastUpdatedStatus(profile: any) {
    let status = this.helperService.showLastUpdatedStatus(profile.li_updated_at);
    return status;
  }

  /**
   * clears the initial params. 
   */
  clearResults() {
    this.results = [];
    this.searchText = '';
    this.isNoResultContacts = false;
    this.isNoResultCompanies = false;
    this.showContactRateLimit = false;
    this.noContactResultFoundPdl = false
  }

  /**
   * This checks for search type tab events on tab change.
   */
  checkForTabEvents() {
    this.subscriptionList$.push(this.searchTextChanged.pipe(debounceTime(500)).subscribe(() => {
      if (this.searchText.length > 1) { this.onSearch(); }
    }),

      /**
       * This event is triggered when user changes tabs.
       */
      this.searchStore
        .pipe(select(onClearSearchByNameSuggestions))
        .subscribe((isClear: boolean) => {
          if (isClear) {
            this.searchStore.dispatch(clearContactLists());
            this.searchStore.dispatch(clearCompanyLists());
            this.clearResults();
          }
          this.cdr.detectChanges();
        })
    )
  }

  /**
   * Dispatch event for store to make TP Search request.
   */
  searchMoreContacts() {
    this.searchStore.dispatch(getContactTpSearchList({ searchText: this.searchText }));
    this.fetchContactTpSearchResults();
  }

  /**
   * Reads results from store for contact TP search results.
   */
  fetchContactTpSearchResults() {
    this.subscriptionList$.push(
      this.searchStore
        .pipe(select(getContactTpSearchSelector))
        .subscribe((response: ContactTpSearchByNameResponse) => {
          if (response && response.total !== null) {
            if (response.total) {
              this.isNoResultContacts = false;
              this.results = this.searchUtilityService.formatTPSearchResponse(response.data);
              this.results.forEach((contact: any) => {
                contact.iconClass = 'pi pi-plus';
                contact.class = '';
              });
            } else if (response.total == 0) {
              this.isNoResultContacts = true;
              this.results = [];
            }
          } else {
            this.results = [];
          }
        })
    );
  }

  /**
   * Handle Error case for PDL API
   */
  onContactTpSearchError() {
    this.subscriptionList$.push(
      this.searchStore
        .pipe(select(onContactTpSearchError))
        .subscribe((error: any) => {
          if (error !== null) {
            this.results = [];
            switch (error.status) {
              case 422:
                this.messageService.add({ severity: 'error', detail: error.error.message });
                this.noContactResultFoundPdl = true;
                break;
              case 429:
                this.messageService.add({ severity: 'error', detail: error.error.message });
                this.showContactRateLimit = true;
                break;
            }
          }
        })
    );
  }

  /**
   * Create placeholder from raw profile data
   * @param payload 
   * @param index Selected index of search suggestions.
   */
  getSelectedProfileFromDS(payload: any, index: any) {
    this.searchStore.dispatch(getContactPlaceHolder({ payload: payload }));
    this.getPlaceHolderProfile(index);
  }

  /**
   * Makes API call to get profile placeholder from store.
   * @param index Selected index of search suggestions.
   */
  getPlaceHolderProfile(index: any) {
    this.subscriptionList$.push(
      this.searchStore
        .pipe(select(getContactSelector))
        .subscribe((contact: Contact) => {
          if (contact.id) {
            this.results[index] = { contact: contact };
            this.results[index].iconClass = 'pi pi-check';
            this.results[index].class = 'icon-color';
            this.searchStore.dispatch(pickSelectedProfile({ payload: { profile: contact, profile_type: this.type } }));
          }
        })
    )
  }

  ngOnDestroy() {
    this.subscriptionList$.forEach(sub$ => { if (sub$) { sub$.unsubscribe(); } });
  }
}
