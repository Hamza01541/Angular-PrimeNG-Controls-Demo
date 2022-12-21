import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '@app/core/services/dashboard/dashboard.service';
import { AppRoutes } from '@app/shared/constants';
import { RecentlyViewed, UseCasesWidget } from '@app/shared/models';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IntrodutionVideoModalComponent } from '@app/modules/dashboard/components';

@Component({
  selector: 'app-search-and-verify',
  templateUrl: './search-and-verify.component.html',
  styleUrls: ['./search-and-verify.component.scss']
})
export class SearchAndVerifyComponent implements OnInit {

  @Input() cardContent: UseCasesWidget;
  @Input() recentContacts: any[];
  @Input() recentAccounts: any[];
  @Input() allSavedSearches: any[];
  @Input() recentSearchedContacts:any[];
  @Input() set recentSearchedAccounts(value:any[]){
    if(value){
      this.recentSearchedAccount = value
    }
  };
  @Input() personaList:any[];
  @Input() set savedSearchAccount(value:any[]){
    if(value){
      this.savedSearchAccounts = value
    }
  };

  @Output() showRightSideBar = new EventEmitter();
  @Output() showContactSideBar = new EventEmitter();
  @Output() showAccountSideBar = new EventEmitter();
  @Output() loadRecentContatsAndAccounts = new EventEmitter();
  @Output() loadRecentlySearchedContactsAndAccounts = new EventEmitter();
  @Output() showRecentlySearchedContactsSideBar = new EventEmitter();
  @Output() showRecentlySearchedAccountsSideBar = new EventEmitter();
  @Output() showSavedSearchCriteriaSideBar = new EventEmitter();
  @Output() loadSavedSearchCriteria = new EventEmitter();

  isShow: boolean;
  isShowRightSideBar: boolean;
  isShowSearchButtons: boolean;
  isShowJobCard: boolean;
  recentlyViewedSearches: any[] = [];
  dialogRef: DynamicDialogRef;
  recentViewed = RecentlyViewed;
  activeCard: string;
  recentVerifiedTab: boolean;
  items: MenuItem[];
  isSideBar: boolean;
  selectedContact: any;
  selectedAccount: any;
  selectedItem: any;
  currentPageUrl: string;
  currentActiveCard: any;
  useCaseDropDownOptions: any;
  selectedRecentlySearchedContant:any;
  selectedRecentlySearchedAccount:any;
  selectedSavedSearchCriteria:any;
  searchAndVerifyList: any [] = []
  recentSearchedAccount: any[];
  savedSearchAccounts: any[];

  constructor(
    private route: Router,
    public dialogService: DialogService,
    public dashboardService: DashboardService) {
      this.useCaseDropDownOptions = {
        recentContactsAndAccounts: 'Recent Contacts & Accounts',
        recentSearchCriteria: 'Recent Search Criteria',
        savedSearchCriteria: 'Saved Search Criteria',
      }
    this.currentActiveCard = this.useCaseDropDownOptions.recentContactsAndAccounts;

    this.searchAndVerifyList = [
      {
        title: 'Recent Contacts & Accounts',
        subTitle: 'Contats & Accounts',
        description: 'Run your first search for contacts and accounts by name, then you will see your recent searches here.'
      },
      {
        title: 'Recent Search Criteria',
        subTitle: 'Search & Verify by Criteria',
        description: 'Run your first search by criteria, then you will see your searches here.'
      },
      {
        title: 'Saved Search Criteria',
        subTitle: 'Search & Save your criteria ',
        description: ''
      },
    ]
  }

  ngOnInit(): void {}

  /**
   * Show Right SideBar
  */
   toggleRightSideBar() {
    this.isShowRightSideBar = true;
    this.showRightSideBar.emit(
      {
        isShowRightSideBar: this.isShowRightSideBar,
        cardContent: this.cardContent,
      }
    );
  }

  /**
   * opens Introduction video Modal popup.
   */
  openVideoModalPopup() {
    this.dialogRef = this.dialogService.open(IntrodutionVideoModalComponent, {
      data: {
        title: this.cardContent.application_use_case.title,
        description: this.cardContent.application_use_case.description
      },
      width: '75%',
      contentStyle: { "padding": "0", "overflow": "hidden", },
      closeOnEscape: true,
      showHeader: false,
    });

    this.dialogRef.onClose.subscribe((data) => {
    });
  }

   /**
   * selected drop down card
   * @param event
   */
    onSelection(event) {
      this.currentActiveCard = event.value;

      switch(this.currentActiveCard){
        case  this.useCaseDropDownOptions.recentContactsAndAccounts:this.loadRecentContatsAndAccounts.emit();
        break;
        case  this.useCaseDropDownOptions.recentSearchCriteria:this.loadRecentlySearchedContactsAndAccounts.emit();
        break;
        case  this.useCaseDropDownOptions.savedSearchCriteria:this.loadSavedSearchCriteria.emit();
        break;
      }
    }

  /**
   * navigate on search component
   * @param search
   */
  navigateToSearchPage(search: string) {
    this.route.navigate([`${AppRoutes.search}`], { queryParams: { selectedTab: search } });
  }

  /**
   * open account sidebar
   * @param account
   */
  openAccountSideBar(account) {
    this.showAccountSideBar.emit(account)
  }

  /**
   * open contacts sidebar
   * @param contact
   */
  openContactSideBar(contact) {
    this.showContactSideBar.emit(contact)
  }

  /**
   * open recently searched contacts
   * @param searchedContact
   */
  openRecentlySearchedContactSideBar(searchedContact) {
    this.showRecentlySearchedContactsSideBar.emit(searchedContact)
  }

  /**
   * open recently searched accounts
   * @param searchedAccount
   */
  openRecentlySearchedAccountSideBar(searchedAccount) {
    this.showRecentlySearchedAccountsSideBar.emit(searchedAccount)
  }

}
