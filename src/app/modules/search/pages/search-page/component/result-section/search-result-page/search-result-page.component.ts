import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { Company, Contact, ProfileType, VerificationStatus } from '@app/shared/models';
import { Subscription } from 'rxjs';
import { PlaceHolders } from '@app/shared/constants';
import { select, Store } from '@ngrx/store';
import { SearchState } from '@app/modules/search/store/search.state';
import { ClearQuickViewStore, getCompany, getContact } from '@app/modules/search/store/search.actions';
import { HelperService } from '@app/core/services';
import { getPickedProfile, getProfileTypeOnSearchPage, onCompanyAdvSearchSelector, onContactAdvSearchSelector } from '@app/modules/search/store/search.selectors';
@Component({
  selector: 'search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.scss']
})
export class SearchResultPageComponent implements OnInit {
  contacts: Contact[];
  companies: Company[];
  selectedContacts: Contact[];
  loading: boolean;
  isAccounts: boolean;
  isContacts: boolean;
  isQuickView: boolean;
  subscriptionList$: Array<Subscription> = [];
  @Output() onTotalResult = new EventEmitter<number>();
  @ViewChild('dt') table: Table;
  statusEnum = VerificationStatus;
  defaultImage = PlaceHolders;

  constructor(private primeNgConfig: PrimeNGConfig,
    private helperService: HelperService,
    private searchStore: Store<SearchState>) { }

  ngOnInit() {
    this.contacts = [];
    this.companies = [];
    this.isContacts = true;
    this.getSelectedProfileAndType();
    this.onContactAdvanceSearchResult();
    this.onCompanySearchResult();
    this.getTabType();
    this.primeNgConfig.ripple = true;
  }

  /**
   * Here response returns { profile_type: Contacts / Accounts, profile: contact json / company json }
   */
  getSelectedProfileAndType() {
    this.subscriptionList$.push(this.searchStore.pipe(select(getPickedProfile)).subscribe((payload: any) => {
      if (payload.profile_type) {
        switch (payload.profile_type) {
          case ProfileType.Contacts:
            this.contacts.push(payload.profile);
            this.contacts = this.helperService.removeDuplicate(this.contacts);
            this.onTotalResult.emit(this.contacts.length);
            break;
          case ProfileType.Accounts:
            this.companies.push(payload.profile);
            this.companies = this.helperService.removeDuplicate(this.companies);
            this.onTotalResult.emit(this.companies.length);
            break;
          default:
            break;
        }
      }
    })
    );
  }

  /**
   * This method will trigger when user will select the tab .
   * Depend on tab it will clear the previously selected result.
   */
  getTabType() {
    this.subscriptionList$.push(
      this.searchStore.pipe(select(getProfileTypeOnSearchPage)).subscribe((type: string) => {
        this.contacts = [];
        this.companies = [];
        this.onTotalResult.emit(this.contacts.length);
        this.onTotalResult.emit(this.companies.length);
        if (type === ProfileType.Contacts) {
          this.isAccounts = false;
          this.isContacts = true;
        }

        if (type === ProfileType.Accounts) {
          this.isAccounts = true;
          this.isContacts = false;
        }
      })
    );
  }

  /**
   * 
   * @param profile 
   * @returns email verification status
   */
  getEmailStatus(profile: Contact) {
    let status: any = this.statusEnum.nodata;
    if (profile.email) {
      status = profile.email_status === this.statusEnum.verified ? this.statusEnum.fresh : this.statusEnum.outdated;
    }

    return status;
  }

  /**
   * 
   * @param profile 
   * @returns phone verification status
   */
  getPhoneStatus(profile: Contact) {
    let status: any = this.statusEnum.nodata;
    if (profile.phone) {
      status = profile.phone_verified ? this.statusEnum.fresh : this.statusEnum.outdated;
    }

    return status;
  }

  /**
   * Get last updated information of contact
   * @param profile
   * @returns Contact
   */
  getLastUpdatedStatus(profile: any) {
    let status = this.helperService.showLastUpdatedStatus(profile.li_updated_at);
    return status;
  }

  /**
   * Get Detailed contact profile by its contact Id
   * @param contactId
   */
  showQuickView(profileId: string) {
    this.isQuickView = true;
    this.searchStore.dispatch(ClearQuickViewStore());

    if (this.isContacts) {
      this.searchStore.dispatch(getContact({ contactId: profileId }));
    }

    if (this.isAccounts) {
      this.searchStore.dispatch(getCompany({ companyId: profileId }));
    }
  }

  /**
   * Close the quick-view when user clicks on close button or anywhere on page when quick-view is opened.
   */
  closeQuickView() {
    this.isQuickView = false;
  }

  /**
   * This returns for contact list based on contact advance search criteria.
   */
  onContactAdvanceSearchResult() {
    this.subscriptionList$.push(this.searchStore.pipe(select(onContactAdvSearchSelector)).subscribe((response: any) => {
      if (response.length) {
        this.contacts = response;
        this.companies = [];
      } else {
        this.contacts = [];
      }

      this.onTotalResult.emit(this.contacts.length);
    })
    );
  }

  /**
   * This returns for company list based on company advance search criteria.
   */
  onCompanySearchResult() {
    this.subscriptionList$.push(this.searchStore.pipe(select(onCompanyAdvSearchSelector)).subscribe((response: any) => {
      if (response.length) {
        this.companies = response;
        this.contacts = [];
      } else {
        this.companies = [];
      }
      this.onTotalResult.emit(this.companies.length);
    })
    )
  }

  ngOnDestroy() {
    this.subscriptionList$.forEach(sub$ => { if (sub$) { sub$.unsubscribe(); } });
  }
}
