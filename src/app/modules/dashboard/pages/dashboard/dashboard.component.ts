import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  moveItemInArray,
  CdkDragDrop,
} from '@angular/cdk/drag-drop';
import { MenuItem, MessageService } from 'primeng/api';
import { QuestionnaireSchema } from '@app/shared/constants';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddWidgetModalComponent, ConfirmationModalComponent } from '@app/modules/dashboard/components';
import { Store, select } from '@ngrx/store';
import { IDashBoardState } from '@app/modules/dashboard/store/dashboard.state'
import {
  deleteTabProcess,
  loadTabList,
  postCardProcess,
  postTabProcess,
  updateTabProcess,
  LoadTabUseCaseWidgetList,
  LoadApplicationUseCaseList,
  LoadRecentContacts,
  LoadRecentAccounts,
  LoadRecentlySearchedContacts,
  LoadRecentlySearchedAccounts,
  LoadSavedSeacrhCriteriaAccounts,
  LoadRecentlyVerifiedContacts,
  LoadRecentlyVerifiedAccounts,
  LoadAllSavedSeacrhes,
} from '@app/modules/dashboard/store/dashboard.actions';
import {
  getAllSavedSearches,
  getAppUseCasesList,
  getRecentAccounts,
  getRecentContacts,
  getRecentlySearchedAccounts,
  getRecentlySearchedContacts,
  getRecentlyVerifiedAccounts,
  getRecentlyVerifiedContacts,
  getSavedSearchCriteriaAccounts,
  getTabList, getTabWidgetList,
} from '@app/modules/dashboard/store/dashboard.selectors';

import { Subscription } from 'rxjs';
import {
  ApplicationUseCases, Tab, UseCasesWidget
} from '@app/shared/models';
import * as moment from 'moment';
import { PersonaState } from '@app/shared/stores/persona/persona.state';
import { getPersonaList } from '@app/shared/stores/persona/persona.actions';
import { personaListSelector } from '@app/shared/stores/persona/persona.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashBoardSettings: MenuItem[] = [{
    items: [
      {
        label: 'Add a Dashboard Page',
      },
      {
        label: 'Rename Dashboard Page',
      },
      {
        label: 'Delete Dashboard Page',
      },
      {
        label: 'Add a Dashboard Widget',
      },
      {
        label: 'Edit Dashboard Widget',
      },
    ]
  }
  ];

  dashBoardGrid: MenuItem[] = [
    {
      items: [
        {
          target: `100%`,
          label: '1 column',
          command: (event) => this.selectedGrid = event.item.target
        },
        {
          target: `50%`,
          label: '2 columns',
          command: (event) => this.selectedGrid = event.item.target
        },
        {
          target: `33.3%`,
          label: '3 columns',
          command: (event) => this.selectedGrid = event.item.target
        },
      ],
    },
  ];

  criteriaWidgetCards: any = [
    { title: "Persona Types", description: "Saved Contact Criteria" },
    { title: "Account Criteria", description: "Saved Account Criteria" },
    { title: "Data Source", description: "Link CRM | CSV files" }
  ];

  useCaseList: ApplicationUseCases[] = [];
  dialogRef: DynamicDialogRef;
  isAddNewTabToggled: boolean = false;
  newTabsItem = ''
  tabs: Tab[] = [];
  selectedGrid = '33.3%';
  questionnaireSchema = QuestionnaireSchema;
  newTab: Tab = new Tab();
  selectedTab: Tab;
  selectedEditingTab: Tab = new Tab();
  subscriptions$: Subscription[] = [];
  originalUseCaseList: ApplicationUseCases[] = [];
  isNewTabWidgetAdded: boolean;
  isShowRightSideBar: boolean;
  isShowQuickStartSideMenu: boolean;
  seletedUseCardWidget: UseCasesWidget;
  updatedDate: number;
  recentContacts: any[];
  recentAccounts: any[];
  selectedContact: any;
  selectedAccount: any;
  isSideBar: any;
  recentSearchedContacts: any[];
  recentSearchedAccounts: any[];
  selectedRecentlySearhedContant: any[];
  selectedRecentlySearhedAccount: any[];
  selectedSavedSearchCriteria: any;
  personaList: any[];
  savedSearchAccount: any[];
  recentVerifiedContacts: any[];
  recentVerifiedAccounts: any[];
  savedContacts: any[];
  allSavedSearches: any[] = [];

  constructor(
    public dialogService: DialogService,
    private messageService: MessageService,
    private dashBoardStore: Store<IDashBoardState>,
    private personaStore: Store<PersonaState>,
  ) { }

  ngOnInit(): void {
    this.loadTabs();
    this.getTabsList();
    this.getTabUseCaseWidgetList();
    this.loadApplicationUseCasesList();
    this.getApplicationUseCasesList();
    this.getRecentContacts();
    this.getRecentAccounts();
    this.getRecentSearchedContacts();
    this.getRecentSearchedAccounts();
    this.getSavedSearchPeronsaCriteria();
    this.getRecentVerifiedContacts();
    this.getRecentVerifiedAccounts();
    this.getSavedSearchAccountCriteria();
    this.getAllSavedSearches();
  }

  /**
   * load Tab List
   */
  loadTabs() {
    this.dashBoardStore.dispatch(loadTabList());
  }

  /**
   * Get Tab List
   */
  getTabsList() {
    this.subscriptions$.push(this.dashBoardStore.pipe(select(getTabList)).subscribe((tabs: Tab[]) => {
      if (tabs && tabs.length) {
        this.tabs = tabs;
        this.selectedTab = this.tabs[0];
        this.loadTabUseCaseWidgetList(this.selectedTab.id);
      }
    }));
  }

  /**
   * Load Tab Use Case Widget
   * @param id
   */
  loadTabUseCaseWidgetList(id) {
    this.dashBoardStore.dispatch(LoadTabUseCaseWidgetList({ tabId: id }));
  }

  /**
   * Get Tab Use Case Widget
   */
  getTabUseCaseWidgetList() {
    this.subscriptions$.push(this.dashBoardStore.pipe(select(getTabWidgetList)).subscribe((widgetList: UseCasesWidget[]) => {
      if (widgetList && widgetList.length) {
        this.selectedTab.use_case_widgets = [];
        this.selectedTab.use_case_widgets = [...widgetList];
        this.selectedTab.use_case_widgets.push({});
        this.loadRecentContactsAndAccounts();
        this.loadRecentVerifiedLists();
        if (!this.isNewTabWidgetAdded) {
          this.getFilteredUseCaseList();
        }
      } else if (this.selectedTab) {
        this.selectedTab.use_case_widgets = [{}];
      }
    }));
  }

  /**
   * Load Application UseCases List
   */
  loadApplicationUseCasesList() {
    this.dashBoardStore.dispatch(LoadApplicationUseCaseList());
  }

  /**
   * Get Application UseCases List.
   */
  getApplicationUseCasesList() {
    this.subscriptions$.push(this.dashBoardStore.pipe(select(getAppUseCasesList)).subscribe((useCaseList: ApplicationUseCases[]) => {
      if (useCaseList && useCaseList.length) {
        this.originalUseCaseList = JSON.parse(JSON.stringify(useCaseList));
        this.useCaseList = JSON.parse(JSON.stringify(useCaseList));
      }
    }));
  }

  /**
   * Show Right Sidebar with usecase data
   * @param event
   */
  showRightSideBar(event: any) {
    this.isShowRightSideBar = event.isShowRightSideBar;
    this.seletedUseCardWidget = event.cardContent;
  }

  /**
   * close left sidebar
   * @param event
   */
  closeSideBar(event: any) {
    this.isShowRightSideBar = event;
  }

  /**
   * Get List After selected dropdown item
   */
  getFilteredUseCaseList() {
    this.selectedTab.use_case_widgets.forEach((item) => {
      const index = this.useCaseList.findIndex((x) => {
        return item.application_use_case && item.application_use_case.id === x.id
      })
      if (index > -1) {
        this.useCaseList.splice(index, 1);
      }
    })
  }

  /**
   *  Add new usecase card
   * @param card
   */
  newCardItem(card: { selectedUseCase: number, selectedCardIndex: number }) {
    if (this.selectedTab.use_case_widgets.length >= 4) {
      this.messageService.add({ severity: 'warn', summary: 'Limit Reached', detail: 'Please Add a new Tab' });
    }
    else {
      this.isNewTabWidgetAdded = true;
      const index = this.useCaseList.findIndex(x => x.id === card.selectedUseCase);
      if (index > -1) {
        this.useCaseList.splice(index, 1)
      }
      const newAddedCard = {
        dashboard_tab_id: this.selectedTab.id,
        application_use_case_id: card.selectedUseCase,
        sequence: card.selectedCardIndex,
      }
      this.dashBoardStore.dispatch(postCardProcess({ newAddedCard }));
    }
  }

  /**
  * Confirmation Delete Tab Popup
  * @param tab
 */
  openDeleteTabModal(tab: Tab): void {
    this.dialogRef = this.dialogService.open(ConfirmationModalComponent, {
      data: {
        imageTitle: "Remove Tab",
        contentTitle: "Tab View Removal",
        contentDescription: "Tab"
      },
      header: 'Delete Tab',
      width: '680px',
      contentStyle: { "padding": "0", "overflow": "hidden" },
    });

    this.dialogRef.onClose.subscribe((isApproved: boolean) => {
      if (isApproved) {
        let currentId = this.tabs.findIndex((val: any) => val.id === tab.id);
        this.tabs.splice(currentId, 1);
        this.dashBoardStore.dispatch(deleteTabProcess({ id: tab.id }));
        this.setTabSequence();
      }
    });
  }

  /**
   *  Confirmation Delete Card Popup
   * @param selectedCardIndex
   */
  openDeleteWidgetModal(selectedCardIndex?: number): void {
    this.dialogRef = this.dialogService.open(ConfirmationModalComponent, {
      data: {
        imageTitle: "Remove Widget",
        contentTitle: "Widget View Removal",
        contentDescription: "Widget",
      },
      header: 'Delete Widget',
      width: '680px',
      contentStyle: { "padding": "0", "overflow": "hidden" },
    });

    this.dialogRef.onClose.subscribe((isApproved: boolean) => {
      if (isApproved) {
        this.selectedTab.use_case_widgets.splice(selectedCardIndex, 1);
      }
    });
  }

  /**
   * Add new widget popup
   */
  addWidget(): void {
    this.dialogRef = this.dialogService.open(AddWidgetModalComponent, {
      header: 'Add New Widget',
      width: '680px',
      contentStyle: { "padding": "0", "overflow": "hidden" },
    });

    this.dialogRef.onClose.subscribe((data) => {

    });
  }

  /**
   * Drag n Drop Tab List
   * @param event
   */
  drop1(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
    this.setTabSequence();
  }

  /**
   * sets tab sequence in proper order
   */
  setTabSequence() {
    let sequence = 1;
    for (const tab of this.tabs) {
      tab.sequence = sequence;
      sequence++;
    }
    this.tabs.forEach((tab: Tab) => {
      if (tab.id) {
        this.dashBoardStore.dispatch(updateTabProcess({ tab: tab }));
      }
    })
  }

  /**
   * Sets the active tab for the current tab
   * Hides tab inputs
   */
  setActiveTab(currentTab: Tab) {
    this.selectedTab.use_case_widgets = [];
    this.selectedTab = currentTab;
    this.isNewTabWidgetAdded = false;
    this.useCaseList = JSON.parse(JSON.stringify(this.originalUseCaseList));
    this.loadTabUseCaseWidgetList(this.selectedTab.id);
    this.selectedEditingTab = new Tab();
    this.isAddNewTabToggled = false;
  }

  /**
   * Add new Tab
   */
  addNewTab() {
    this.newTab.sequence = this.tabs[this.tabs.length - 1].sequence + 1;
    if (this.newTab && this.newTab.name) {
      this.dashBoardStore.dispatch(postTabProcess({ tab: this.newTab }));
    }
    this.newTab = new Tab();
    this.toggleAddNewTab();
  }

  /**
   * edit Tab item
   * @param tab
   */
  editTabItem(tab: Tab) {
    this.selectedEditingTab = tab;
  }

  /**
   * Update Tab
  */
  updateTab() {
    this.dashBoardStore.dispatch(updateTabProcess({ tab: this.selectedEditingTab }))
    this.selectedEditingTab = new Tab();
  }

  /**
   * Remove Tab
   * @param tab
   */
  removeTabItem(tab: Tab) {
    this.openDeleteTabModal(tab);
  }

  /**
   * Toggle Add new tab
   */
  toggleAddNewTab() {
    this.isAddNewTabToggled = !this.isAddNewTabToggled;
  }

  /**
   * setting model
   */
  getSettings() {
    this.dashBoardSettings = [
      {
        items: [
          {
            label: 'Add a Dashboard Page',
          },
          {
            label: 'Rename Dashboard Page',
          },
          {
            label: 'Delete Dashboard Page',
          },
          {
            label: 'Add a Dashboard Widget',
          },
          {
            label: 'Edit Dashboard Widget',
          },
        ],
      },
    ];
  }

  /**
   * drag n drop card list
   * @param event
   */
  drop2(event: CdkDragDrop<any>) {
    this.selectedTab.use_case_widgets[event.previousContainer.data.index] = event.container.data.item;
    this.selectedTab.use_case_widgets[event.container.data.index] = event.previousContainer.data.item;
  }

  /**
   * select Dashboard setting menu
   * @param event
   */
  selectDashboardSettingMenuItem(event: any) {

    switch (event.target.textContent) {
      case 'Add a Dashboard Page':

        break;
      case 'Rename Dashboard Page':

        break;
      case 'Delete Dashboard Page':

        break;
      case 'Add a Dashboard Widget':
        this.addWidget();
        break;
      case 'Edit Dashboard Widget':
        this.addWidget();
        break;

      default:
        break;
    }
  }

  /**
   * shows Quick Start SideMenu
   */
  showQuickStartSideMenu() {
    this.isShowQuickStartSideMenu = true;
  }

  /**
   * hides Quick Start SideMenu
   */
  hideQucikStartMenu(event) {
    this.isShowQuickStartSideMenu = event;
  }

  /**
   * shows last updated date in days count
   */
  getUpdatedDays() {

    if (this.recentContacts) {
      this.recentContacts.forEach((item) => {
        if (item.updated_at) {
          item.lastUpdatedDate = Math.abs(moment(new Date()).diff(moment(item.updated_at), 'days')) + 1;
        }
      });
    }
    if (this.recentAccounts) {
      this.recentAccounts.forEach((item) => {
        if (item.li_updated_at) {
          item.lastUpdatedDate = Math.abs(moment(new Date()).diff(moment(item.li_updated_at), 'days')) + 1;
        }
      });
    }
  }

  /**
   * Get Recently Viewed Contacts
   */
  getRecentContacts() {
    this.subscriptions$.push(this.dashBoardStore.pipe(select(getRecentContacts)).subscribe((recentContacts: any[]) => {
      if (recentContacts && recentContacts.length) {
        this.recentContacts = recentContacts;
        this.getUpdatedDays();
      }
    }));
  }

  /**
   * Get Recently Verified Companies
   */
  getRecentAccounts() {
    this.subscriptions$.push(this.dashBoardStore.pipe(select(getRecentAccounts)).subscribe((recentAccounts: any[]) => {
      if (recentAccounts && recentAccounts.length) {
        this.recentAccounts = recentAccounts;
        this.getUpdatedDays();
      }
    }));
  }

  /**
  * open contact sidebar
  * @param event
  */
  showContactSideBar(event) {
    this.isSideBar = event.isSideBar;
    this.selectedContact = event.selectedContact;
    this.selectedAccount = event.selectedAccount;
  }

  /**
  * open account sidebar
  * @param event
  */
  showAccountSideBar(event) {
    this.isSideBar = event.isSideBar;
    this.selectedContact = event.selectedContact;
    this.selectedAccount = event.selectedAccount;
  }

  /**
   * get Recent Searched Contacts
   */
  getRecentSearchedContacts() {
    this.subscriptions$.push(this.dashBoardStore.pipe(select(getRecentlySearchedContacts)).subscribe((recentSearhedContact: any[]) => {
      if (recentSearhedContact && recentSearhedContact.length) {
        this.recentSearchedContacts = recentSearhedContact;
      }
    }));
  }

  /**
   * get Recent Searched Accounts
   */
  getRecentSearchedAccounts() {
    this.subscriptions$.push(this.dashBoardStore.pipe(select(getRecentlySearchedAccounts)).subscribe((recentSearhedAccounts: any[]) => {
      if (recentSearhedAccounts && recentSearhedAccounts.length) {
        this.recentSearchedAccounts = recentSearhedAccounts;
      }
    }));
  }

  /**
   * get Saved Personsa Criteria
   */
  getSavedSearchPeronsaCriteria() {
    this.subscriptions$.push(this.personaStore.pipe(select(personaListSelector)).subscribe((personaList: any[]) => {
      if (personaList && personaList.length) {
        this.personaList = personaList;
      }
    }));
  }

  /**
   * get Saved Personsa Criteria
   */
  getSavedSearchAccountCriteria() {
    this.subscriptions$.push(this.dashBoardStore.pipe(select(getSavedSearchCriteriaAccounts)).subscribe((savedSearchCriteriaAccount: any[]) => {
      if (savedSearchCriteriaAccount && savedSearchCriteriaAccount.length) {
        this.savedSearchAccount = savedSearchCriteriaAccount;
      }
    }));
  }

  /**
   * get All Saved Searches.
   */
  getAllSavedSearches() {
    this.subscriptions$.push(this.dashBoardStore.pipe(select(getAllSavedSearches)).subscribe((allSavedSearches: any[]) => {
      if (allSavedSearches && allSavedSearches.length) {
        this.allSavedSearches = allSavedSearches;
      }
    }));
  }

  /**
   * get Recent Verified Contacts
   */
  getRecentVerifiedContacts() {
    this.subscriptions$.push(this.dashBoardStore.pipe(select(getRecentlyVerifiedContacts)).subscribe((recentVerifiedContacts: any[]) => {
      if (recentVerifiedContacts && recentVerifiedContacts.length) {
        this.recentVerifiedContacts = recentVerifiedContacts;
      }
    }));
  }

  /**
   * get Recent Verified Accounts
   */
  getRecentVerifiedAccounts() {
    this.subscriptions$.push(this.dashBoardStore.pipe(select(getRecentlyVerifiedAccounts)).subscribe((recentVerifiedAccounts: any[]) => {
      if (recentVerifiedAccounts && recentVerifiedAccounts.length) {
        this.recentVerifiedAccounts = recentVerifiedAccounts;
      }
    }));
  }

  /**
   * fecthing Recent Contacts And Accounts
   */
  loadRecentContactsAndAccounts() {
    this.dashBoardStore.dispatch(LoadRecentContacts());
    this.dashBoardStore.dispatch(LoadRecentAccounts());
  }

  /**
   * fecthing Recently Searched Contacts And Accounts
   */
  loadRecentlySearchedContactsAndAccounts() {
    this.dashBoardStore.dispatch(LoadRecentlySearchedContacts());
    this.dashBoardStore.dispatch(LoadRecentlySearchedAccounts());
  }

  /**
 * fecthing Recently Searched Contacts And Accounts
 */
  loadSavedSearchCriterias() {
    this.personaStore.dispatch(getPersonaList({ startIndex: 0 }));
    this.dashBoardStore.dispatch(LoadSavedSeacrhCriteriaAccounts());
    this.dashBoardStore.dispatch(LoadAllSavedSeacrhes());
  }

  /**
 * fecthing Recent Verified Contacts And Accounts
 */
  loadRecentVerifiedLists() {
    this.dashBoardStore.dispatch(LoadRecentlyVerifiedContacts());
    this.dashBoardStore.dispatch(LoadRecentlyVerifiedAccounts());
  }


  /**
  * open recent Searched contact sidebar
  * @param event
  */
  showRecentlySearchedContactSideBar(event) {
    this.isSideBar = event.isSideBar;
    this.selectedRecentlySearhedContant = event.selectedRecentlySearhedContant;
    this.selectedContact = event.selectedContact;
    this.selectedAccount = event.selectedAccount;
  }

  /**
  * open recent Searched contact sidebar
  * @param event
  */
  showRecentlySearchedAccountSideBar(event) {
    this.isSideBar = event.isSideBar;
    this.selectedRecentlySearhedContant = event.selectedRecentlySearhedContant;
    this.selectedContact = event.selectedContact;
    this.selectedAccount = event.selectedAccount;
  }

  /**
  * open saved Search criteria sidebar
  * @param event
  */
  showSavedSearchCriteriaSideBar(event) {
    this.isSideBar = event.isSideBar;
    this.selectedSavedSearchCriteria = event.selectedSavedSearchCriteria;
  }

  /**
   * destroy subscription
   */
  ngOnDestroy() {
    this.subscriptions$.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
