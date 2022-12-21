import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '@app/core/services/dashboard/dashboard.service';
import { RecentlyViewed, UseCasesWidget } from '@app/shared/models';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IntrodutionVideoModalComponent } from '@app/modules/dashboard/components';
import { MenuItem } from 'primeng/api';
import { AppRoutes } from '@app/shared/constants';

@Component({
  selector: 'app-build-verified-list',
  templateUrl: './build-verified-list.component.html',
  styleUrls: ['./build-verified-list.component.scss']
})
export class BuildVerifiedListComponent implements OnInit {
  @Input() cardContent: UseCasesWidget;
  @Input() recentVerifiedContacts:any[];
  @Input() recentVerifiedAccounts:any[];

  @Output() showRightSideBar = new EventEmitter();
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
  selectedItem: any;
  currentPageUrl: string;
  currentActiveCard: any;
  useCaseDropDownOptions: any;
  selectedRecentlySearchedContant:any;
  selectedRecentlySearchedAccount:any;
  selectedSavedSearchCriteria:any;
  searchAndVerifyList: any [] = [];
  buildVerifiedList: { title: string; subTitle: string;}[];

  constructor(
    private route: Router,
    public dialogService: DialogService,
    public dashboardService: DashboardService
  ) {

    this.useCaseDropDownOptions = {
      verifiedLists: 'Recent Verified List',
      savedLists: 'Saved List',
      allLists: 'All Lists',
    }

    this.buildVerifiedList = [
      {
        title: 'Recent Verified List',
        subTitle: 'build verifid List of Contacts and Accounts',
      },
      {
        title: 'Saved List',
        subTitle: 'Search & Saved List of Contacts and Accounts',
      },
      {
        title: 'All List',
        subTitle: 'build verifid List of Contacts and Accounts',
      },
    ]
  }

  ngOnInit(): void {
    this.currentActiveCard = this.useCaseDropDownOptions.verifiedLists;
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
   * navigate on search component
   * @param search
   */
  navigateToSearchPage(search: string) {
    this.route.navigate([`${AppRoutes.search}`], { queryParams: { selectedTab: search } });
  }

  /**
   * selected drop down card
   * @param event
   */
   onSelection(event) {
    this.currentActiveCard = event.value;
    switch(this.currentActiveCard){
      case  this.useCaseDropDownOptions.verifiedLists: this.loadRecentVerifiedList.emit();
      break;
    }
  }
}
