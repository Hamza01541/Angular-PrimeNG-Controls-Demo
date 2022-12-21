import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recent-search-criteria',
  templateUrl: './recent-search-criteria.component.html',
  styleUrls: ['./recent-search-criteria.component.scss']
})
export class RecentSearchCriteriaComponent implements OnInit {

  @Input() recentSearchedContacts:any[];
  // @Input() recentSearchedAccounts:any[];
  @Input() set recentSearchedAccounts(value:any[]){
    if(value){
      this.recentSearchedAccount = value;
    }
  };

  @Output() showRecentlySearchedContactsSideBar = new EventEmitter();
  @Output() showRecentlySearchedAccountsSideBar = new EventEmitter();

  recentSearchedAccount: any[];

  constructor() { }

  ngOnInit(): void {}

  /**
   * open Recent Searched Contact sidebar
   * @param searchedContact
   */
   openRecentlySearchedContactSideBar(searchedContact) {
      this.showRecentlySearchedContactsSideBar.emit(searchedContact);
    }

    /**
   * open Recent Searched Contact sidebar
   * @param searchedAccount
   */
   openRecentlySearchedAccountSideBar(searchedAccount) {
      this.showRecentlySearchedAccountsSideBar.emit(searchedAccount);
    }

}
