import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppRoutes } from '@app/shared/constants';
import { UseCasesWidget, RecentlyViewed } from '@app/shared/models';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DashboardService } from '@app/core/services/dashboard/dashboard.service';
import { MenuItem } from 'primeng/api';
import { IntrodutionVideoModalComponent } from '@app/modules/dashboard/components';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-usecase-widget-card',
  templateUrl: './usecase-widget-card.component.html',
  styleUrls: ['./usecase-widget-card.component.scss'],
})

export class UsecaseWidgetCardComponent implements OnInit {
  @Input() cardContent: UseCasesWidget;
  @Input() recentContacts: any[];
  @Input() recentAccounts: any[];
  @Input() recentSearchedContacts:any[];
  @Input() recentSearchedAccounts:any[];
  @Input() personaList:any[];
  @Input() savedSearchAccount:any[];
  @Input() recentVerifiedContacts:any[];
  @Input() recentVerifiedAccounts:any[];
  @Input() savedContacts:any[];
  @Input() allSavedSearches:any[];

  @Output() showRightSideBar = new EventEmitter();
  @Output() showContactSideBar = new EventEmitter();
  @Output() showAccountSideBar = new EventEmitter();
  @Output() loadRecentContatsAndAccounts = new EventEmitter();
  @Output() loadRecentlySearchedContactsAndAccounts = new EventEmitter();
  @Output() showRecentlySearchedContactsSideBar = new EventEmitter();
  @Output() showRecentlySearchedAccountsSideBar = new EventEmitter();
  @Output() showSavedSearchCriteriaSideBar = new EventEmitter();
  @Output() loadSavedSearchCriterias = new EventEmitter();
  @Output() loadRecentVerifiedList = new EventEmitter();

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
  searchAndVerifyList: any;
  selectedItem: any;
  currentPageUrl: string;
  currentActiveCard: any;
  useCaseDropDownOptions: any;
  selectedRecentlySearchedContant:any;
  selectedRecentlySearchedAccount:any;
  selectedSavedSearchCriteria:any;

  constructor(
    private route: Router,
    public dialogService: DialogService,
    public dashboardService: DashboardService,
  ) {}

  ngOnInit(): void {
    this.items = [{
      label: 'Options',
      items: [
        {
          label: 'Follow & Get Updates',
          command: () => {
            this.followAndGet();
          }
        },
        {
          label: 'Refresh and Verify',
          command: () => {
            this.refreshAndVerify();
          }
        }
      ]
    },
    {
      label: 'Navigate',
      items: [{
        label: 'Save to CRM',
        command: () => {
          this.saveToCrm();
        }
      },
      {
        label: 'Save to List',
        command: () => {
          this.saveToList();
        }
      }
      ]
    }
    ];
  }

  /**
   * change card on click
   * @param card
   */
  changeUseCaseCard(card) {
    this.activeCard = card;
  }

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
   * Search
   */
  showSearchButtons() {
    this.isShowSearchButtons = true;
  }

  /**
   * open contact sidebar
   * @param contact
   */
  openContactSideBar(contact) {
    this.isSideBar = true;
    this.selectedContact = contact;
    this.selectedAccount = null;
    this.showContactSideBar.emit({
      isSideBar: this.isSideBar,
      selectedContact: this.selectedContact,
      selectedAccount: this.selectedAccount,
    })
  }

  /**
   * open account sidebar
   * @param account
   */
  openAccountSideBar(account) {
    this.isSideBar = true;
    this.selectedAccount = account;
    this.selectedContact = null;
    this.showAccountSideBar.emit({
      isSideBar: this.isSideBar,
      selectedAccount: this.selectedAccount,
      selectedContact: this.selectedContact,
    })
  }

  /**
   * open Recent Searched Contact sidebar
   * @param searchedContact
   */
  openRecentlySearchedContactSideBar(searchedContact) {
    this.isSideBar = true;
    this.selectedRecentlySearchedContant = searchedContact;
    this.showRecentlySearchedContactsSideBar.emit({
      isSideBar: this.isSideBar,
      selectedRecentlySearhedContant:this.selectedRecentlySearchedContant,
    })
  }

  /**
   * open Recent Searched Contact sidebar
   * @param searchedContact
   */
  openRecentlySearchedAccountSideBar(searchedAccount) {
    this.isSideBar = true;
    this.selectedRecentlySearchedAccount = searchedAccount;
    this.showRecentlySearchedContactsSideBar.emit({
      isSideBar: this.isSideBar,
      selectedRecentlySearchedAccount:this.selectedRecentlySearchedAccount,
    })
  }

  /**
   * open saved Searched criteria sidebar
   */
  openSavedSearchCriteria(){
    this.isSideBar = true;
    this.showSavedSearchCriteriaSideBar.emit({
      isSideBar: this.isSideBar,
      selectedSavedSearchCriteria:this.selectedSavedSearchCriteria,
    })

  }

  /**
   * load recent Contacts and Account
   */
  loadRecentContatsAndAccount() {
    this.loadRecentContatsAndAccounts.emit();
  }

   /**
   * load recently Searched Contacts and Account
   */
  loadRecentlySearchedContactsAndAccount() {
    this.loadRecentlySearchedContactsAndAccounts.emit();
  }

  /**
   * load saved search criteria
   */
   loadSavedSearchCriteria() {
    this.loadSavedSearchCriterias.emit();
  }

  /**
   * load Recent Verified Lists
   */
   loadRecentVerifiedLists() {
    this.loadRecentVerifiedList.emit();
  }

  /**
   *
   */
  followAndGet() {}

  /**
   *
   */
  refreshAndVerify() {}

  /**
   *
   */
  saveToCrm() { }

  /**
   *
   */
  saveToList() { }

}
