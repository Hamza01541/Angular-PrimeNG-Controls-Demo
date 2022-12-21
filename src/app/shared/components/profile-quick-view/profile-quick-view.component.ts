import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperService } from '@app/core/services';
import { SearchingService } from '@app/core/services/searching/searching.service';
import { getCompanySelector, getContactSelector } from '@app/modules/search/store/search.selectors';
import { SearchState } from '@app/modules/search/store/search.state';
import { Company, Contact } from '@app/shared/models';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'profile-quick-view',
  templateUrl: './profile-quick-view.component.html',
  styleUrls: ['./profile-quick-view.component.scss']
})
export class ProfileQuickViewComponent implements OnInit {

  @Input() set selectedContact(value: any) {
    if (value) {
      this.contact = value;
      this.company = null;
      this.recentSearchedAccount = null;
      this.recentSearchedContact = null;
    }
  };

  @Input() set selectedAccount(value: any) {
    if (value) {
      this.company = value;
      this.contact = null;
      this.recentSearchedAccount = null;
      this.recentSearchedContact = null;
    }
  };

  @Input() set selectedRecentlySearhedContant(value: any) {
    if (value) {
      this.recentSearchedContact = value;
      this.recentSearchedAccount = null;
      this.contact = null;
      this.company = null;
    }
  };

  @Input() set selectedRecentlySearhedAccount(value: any) {
    if (value) {
      this.recentSearchedAccount = value;
      this.recentSearchedContact = null;
      this.contact = null;
      this.company = null;
    }
  };

  @Output() onCloseView = new EventEmitter<boolean>();

  contact: Contact;
  company: Company;
  recentSearchedContact:any;
  recentSearchedAccount:any;
  profileStatus: any;
  subscriptionList$: Array<Subscription> = [];
  isCurrentPosition: boolean;
  checkDate:any;
  status:string;
  constructor(private searchService: SearchingService,
    private searchStore: Store<SearchState>,
    public helperService: HelperService) { }

  ngOnInit(): void {
    this.fetchCompanyProfile();
    this.fetchContactProfile();
  }

  /**
   * Fetches contact profile from store
   */
  fetchContactProfile() {
    this.subscriptionList$.push(
      this.searchStore
        .pipe(select(getContactSelector))
        .subscribe((contact: Contact) => {
          this.contact = null;
          if (contact.id) {
            this.contact = contact;
            if (this.contact.current_position && this.contact.current_position['id']) {
              this.isCurrentPosition = true;
              this.profileStatus = this.searchService.fetchCurrentPositionDetails(this.contact.current_position, true);
            } else {
              this.isCurrentPosition = false;
              this.profileStatus = this.searchService.fetchCurrentPositionDetails(this.contact.past_positions, false);
            }
          }
        })
    )
  }

  /**
   * Fetches company profile from store
   */
  fetchCompanyProfile() {
    this.subscriptionList$.push(
      this.searchStore
        .pipe(select(getCompanySelector))
        .subscribe((company: Company) => {
          this.company = null;
          if (company.id) {
            this.company = company;
          }
        })
    )
  }

  /**
   * Returns last updated date of profile
   * @param profile ]
   * @returns last updated date
   */
  getLastUpdatedStatus(profile: Contact) {
    let status = this.helperService.showLastUpdatedStatus(profile.li_updated_at);
    return status;
  }

  /**
   * Closes the sidebar popup.
   */
  closeQuickView() {
    this.contact = null;
    this.company = null;
    this.onCloseView.emit(false);
  }

  /**
   * Navigates to specified url in new browser tab.
   * @param url
   */
  goToLink(url: string) {
    this.helperService.visitLink(url);
  }

  ngOnDestroy() {
    this.subscriptionList$.forEach(sub$ => { if (sub$) { sub$.unsubscribe(); } });
    this.contact = null;
    this.company = null;
  }
}
