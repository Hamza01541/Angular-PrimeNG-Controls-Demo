import { Component, Input, OnInit } from '@angular/core';
import { EGridSelectionType, IGridColumn, IGridColumnAction } from '@app/shared/models';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-recent-activity-grid',
  templateUrl: './recent-activity-grid.component.html',
  styleUrls: ['./recent-activity-grid.component.scss'],
})
export class RecentActivityGridComponent implements OnInit {
  @Input() totalRecords: any;
  @Input() selectedRows: any[] = [];
  @Input() recentContacts:any[];
  @Input() recentAccounts:any[];
  @Input() recentSearches:any[];

  gridSelectionType: EGridSelectionType = EGridSelectionType.MULTIPLE;
  recentAccountsRows: any[] = [];
  recentAccountsColumns: IGridColumn[] = []
  recentAccountsColumnActions: IGridColumnAction[] = []
  recentContactsColumns: IGridColumn[] = []
  recentContactsRows: any[] = [];
  recentContactsColumnActions: IGridColumnAction[] = []
  recentSearchesColumns: any[] = []
  recentSearchesRows: any[] = [];
  recentSearchesColumnActions: IGridColumnAction[] = []

  isSidebar: boolean;


  constructor() { }

  ngOnInit() {
    this.setRecentAccountsInitialValues();
    this.setRecentContactsInitialValues();
    this.setRecentSearchsInitialValues();
  }



  /**
 * initialize recent account values
 */
  setRecentAccountsInitialValues() {
    this.recentAccountsColumns = [
      {
        field: 'Account',
        header: 'Account Name',
        width: '200px',
        filtering: false
      },
      {
        field: 'LastActivity',
        header: 'Last Activity',
        width: '200px',
        filtering: false
      },
      {
        field: 'Industry',
        header: 'Industry',
        width: '200px',
        filtering: false
      },
      {
        field: 'Employees',
        header: 'Employees',
        width: '200px',
        filtering: false
      },
      {
        field: 'VerificationStatus',
        header: 'Verification Status',
        width: '200px',
        filtering: false

      },
      {
        field: 'VerifyAction',
        header: 'Verify Action',
        width: '200px',
        filtering: false
      },
    ]

    this.recentAccountsRows = [
      {
        LastActivity: 'Today at 1:00 AM',
        Account: {
          accountName: 'BrightLine CPAs & Associates, Inc.',
          image: 'assets/icons/square.png',
          location: 'Redmond, US-WA, United States',
          facebookIcon: 'assets/icons/facebook.svg',
          linkedinIcon: 'assets/icons/linkdin.svg',
          twitterIcon: 'assets/icons/twitter.svg',
        },
        Industry: 'Medical Industry',
        Employees: '1000+',
        VerificationStatus: 'Verified',
        VerifyAction: 'Verify',
      },
      {
        LastActivity: 'Today at 1:00 AM',
        Account: {
          accountName: 'BrightLine CPAs & Associates, Inc.',
          image: 'assets/icons/square.png',
          location: 'Redmond, US-WA, United States',
          facebookIcon: 'assets/icons/facebook.svg',
          linkedinIcon: 'assets/icons/linkdin.svg',
          twitterIcon: 'assets/icons/twitter.svg',
        },
        Industry: 'Medical Industry',
        Employees: '2000+',
        VerificationStatus: 'Verified',
        VerifyAction: 'Verify',
      },
      {
        LastActivity: 'Today at 1:00 AM',
        Account: {
          accountName: 'BrightLine CPAs & Associates, Inc.',
          image: 'assets/icons/square.png',
          location: 'Redmond, US-WA, United States',
          facebookIcon: 'assets/icons/facebook.svg',
          linkedinIcon: 'assets/icons/linkdin.svg',
          twitterIcon: 'assets/icons/twitter.svg',
        },
        Industry: 'Medical Industry',
        Employees: '3000+',
        VerificationStatus: 'Verified',
        VerifyAction: 'Verify',
      },
      {
        LastActivity: 'Today at 1:00 AM',
        Account: {
          accountName: 'BrightLine CPAs & Associates, Inc.',
          image: 'assets/icons/square.png',
          location: 'Redmond, US-WA, United States',
          facebookIcon: 'assets/icons/facebook.svg',
          linkedinIcon: 'assets/icons/linkdin.svg',
          twitterIcon: 'assets/icons/twitter.svg',
        },
        Industry: 'Medical Industry',
        Employees: '4000+',
        VerificationStatus: 'Verified',
        VerifyAction: 'Verify',
      },
      {
        LastActivity: 'Today at 1:00 AM',
        Account: {
          accountName: 'BrightLine CPAs & Associates, Inc.',
          image: 'assets/icons/square.png',
          location: 'Redmond, US-WA, United States',
          facebookIcon: 'assets/icons/facebook.svg',
          linkedinIcon: 'assets/icons/linkdin.svg',
          twitterIcon: 'assets/icons/twitter.svg',
        },
        Industry: 'Medical Industry',
        Employees: '5000+',
        VerificationStatus: 'Verified',
        VerifyAction: 'Verify',
      },

    ]
    // initialize grid actions column
    this.recentAccountsColumnActions = [
      {
        icon: 'pi pi-eye',
        tooltip: 'Account Quickview',
        width: '50px',
        onClick: (data) => { console.log('quickview event invoked for row data:', data); },
      },
      {
        icon: 'pi pi-cloud-download',
        tooltip: 'downoad',
        width: '100px',
        onClick: (data) => {
          console.log('downoad event invoked for row data:', data);
        },
      },
      {
        icon: 'pi pi-save',
        tooltip: 'Save to List',
        width: '100px',
        onClick: (data) => {
          console.log('save event invoked for row data:', data);
        },
      },
      {
        icon: 'pi pi-ellipsis-v',
        tooltip: 'menu',
        width: '100px',
        onClick: (data) => {
          console.log('menu event invoked for row data:', data);
        },
      },
    ];
  }

  setRecentContactsInitialValues() {
    this.recentContactsColumns = [
      {
        field: 'Contact',
        header: 'Contact Name',
        width: '200px',
        filtering: false
      },
      {
        field: 'LastActivity',
        header: 'Last Activity',
        width: '200px',
        filtering: false
      },
      {
        field: 'Company',
        header: 'Company',
        width: '200px',
        filtering: false
      },
      {
        field: 'ContactProfile',
        header: 'Contact Profile',
        width: '200px',
        filtering: false
      },
      {
        field: 'ContactInformation',
        header: 'Contact Information',
        width: '200px',
        filtering: false
      },
      {
        field: 'VerificationStatus',
        header: 'Verification Status',
        width: '200px',
        filtering: false
      },
      {
        field: 'Action',
        header: 'Action',
        width: '200px',
        filtering: false
      },
    ]

    this.recentContactsRows = [
      {
        Contact: {
          contactName: 'Jeff Lavers',
          designation: 'Executive Vice President',
          image: 'assets/icons/ceo.png',
          linkedinIcon: 'assets/icons/linkdin.svg',
        },
        LastActivity: 'Today at 1:00 AM',
        Company: {
          companyName: 'Adobe Inc.',
          companyLogo: 'assets/icons/company-logo.svg',
        },
        ContactProfile: 'assets/icons/contact.svg',
        ContactInformation: {
          email: 'assets/icons/email.svg',
          phone: 'assets/icons/phone.svg',
          location: 'assets/icons/map.svg',
          telephone: 'assets/icons/telephone.svg',
        },
        VerificationStatus: 'Verified',
        Action: 'Verify',
      },
      {
        Contact: {
          contactName: 'Jeff Lavers',
          designation: 'Executive Vice President',
          image: 'assets/icons/ceo.png',
          linkedinIcon: 'assets/icons/linkdin.svg',
        },
        LastActivity: 'Today at 2:00 AM',
        Company: {
          companyName: 'Adobe Inc.',
          companyLogo: 'assets/icons/company-logo.svg',
        },
        ContactProfile: 'assets/icons/contact.svg',
        ContactInformation: {
          email: 'assets/icons/email.svg',
          phone: 'assets/icons/phone.svg',
          location: 'assets/icons/map.svg',
          telephone: 'assets/icons/telephone.svg',
        },
        VerificationStatus: 'Verified',
        Action: 'Verify',
      },
      {
        Contact: {
          contactName: 'Jeff Lavers',
          designation: 'Executive Vice President',
          image: 'assets/icons/ceo.png',
          linkedinIcon: 'assets/icons/linkdin.svg',
        },
        LastActivity: 'Today at 3:00 AM',
        Company: {
          companyName: 'Adobe Inc.',
          companyLogo: 'assets/icons/company-logo.svg',
        },
        ContactProfile: 'assets/icons/contact.svg',
        ContactInformation: {
          email: 'assets/icons/email.svg',
          phone: 'assets/icons/phone.svg',
          location: 'assets/icons/map.svg',
          telephone: 'assets/icons/telephone.svg',
        },
        VerificationStatus: 'Verified',
        Action: 'Verify',
      },
      {
        Contact: {
          contactName: 'Jeff Lavers',
          designation: 'Executive Vice President',
          image: 'assets/icons/ceo.png',
          linkedinIcon: 'assets/icons/linkdin.svg',
        },
        LastActivity: 'Today at 4:00 AM',
        Company: {
          companyName: 'Adobe Inc.',
          companyLogo: 'assets/icons/company-logo.svg',
        },
        ContactProfile: 'assets/icons/contact.svg',
        ContactInformation: {
          email: 'assets/icons/email.svg',
          phone: 'assets/icons/phone.svg',
          location: 'assets/icons/map.svg',
          telephone: 'assets/icons/telephone.svg',
        },
        VerificationStatus: 'Verified',
        Action: 'Verify',
      },
      {
        Contact: {
          contactName: 'Jeff Lavers',
          designation: 'Executive Vice President',
          image: 'assets/icons/ceo.png',
          linkedinIcon: 'assets/icons/linkdin.svg',
        },
        LastActivity: 'Today at 5:00 AM',
        Company: {
          companyName: 'Adobe Inc.',
          companyLogo: 'assets/icons/company-logo.svg',
        },
        ContactProfile: 'assets/icons/contact.svg',
        ContactInformation: {
          email: 'assets/icons/email.svg',
          phone: 'assets/icons/phone.svg',
          location: 'assets/icons/map.svg',
          telephone: 'assets/icons/telephone.svg',
        },
        VerificationStatus: 'Verified',
        Action: 'Verify',
      },
      {
        Contact: {
          contactName: 'Jeff Lavers',
          designation: 'Executive Vice President',
          image: 'assets/icons/ceo.png',
          linkedinIcon: 'assets/icons/linkdin.svg',
        },
        LastActivity: 'Today at 6:00 AM',
        Company: {
          companyName: 'Adobe Inc.',
          companyLogo: 'assets/icons/company-logo.svg',
        },
        ContactProfile: 'assets/icons/contact.svg',
        ContactInformation: {
          email: 'assets/icons/email.svg',
          phone: 'assets/icons/phone.svg',
          location: 'assets/icons/map.svg',
          telephone: 'assets/icons/telephone.svg',
        },
        VerificationStatus: 'Verified',
        Action: 'Verify',
      },


    ]
    // initialize grid actions column
    this.recentContactsColumnActions = [
      {
        icon: 'pi pi-eye',
        tooltip: 'Account Quickview',
        width: '50px',
        onClick: (data) => { console.log('quickview event invoked for row data:', data); },
      },
      {
        icon: 'pi pi-cloud-download',
        tooltip: 'downoad',
        width: '100px',
        onClick: (data) => {
          console.log('downoad event invoked for row data:', data);
        },
      },
      {
        icon: 'pi pi-save',
        tooltip: 'Save to List',
        width: '100px',
        onClick: (data) => {
          console.log('save event invoked for row data:', data);
        },
      },
      {
        icon: 'pi pi-ellipsis-v',
        tooltip: 'menu',
        width: '100px',
        onClick: (data) => {
          console.log('menu event invoked for row data:', data);
        },
      },
    ];

  }

  setRecentSearchsInitialValues() {
    this.recentSearchesColumns = [
      {
        field: 'SearchesId',
        header: 'Search ID',
        width: '200px',
        filtering: false
      },
      {
        field: 'LastActivity',
        header: 'Last Activity',
        width: '200px',
        filtering: false
      },
      {
        field: 'NoOfContacts',
        header: 'No Of Contacts',
        width: '200px',
        filtering: false
      },

      {
        field: 'ContactCriteria',
        header: ' Contact Criteria',
        width: '200px',
        filtering: false
      },
      {
        field: 'AccountCriteria',
        header: 'Account Criteria',
        width: '200px',
        filtering: false
      },
      {
        field: 'Action',
        header: 'Action',
        width: '200px',
        filtering: false
      },

    ]

    this.recentSearchesRows = [
      {
        SearchesId: {
          searchesId: 'Search #0003'
        },
        LastActivity: 'Today at 1:00 AM',

        NoOfContacts: {
          noOfContacts: '220 Contacts',
        },
        ContactCriteria: {
          jobTitle: 'Job Title (4)',
          seniorityLevel: 'Seniority Level (3)',
          twoMoreContact: '2 more',
        },
        AccountCriteria: {
          employeeRange: 'Employee Range (3)',
          revenueRange: 'Revenue Range (1)',
          twoMoreAccount: '2 more',

        },
        Action: 'Run Search',
      },
      {
        SearchesId: {
          searchesId: 'Search #0003'
        },
        LastActivity: 'Today at 2:00 AM',
        NoOfContacts: {
          noOfContacts: '220 Contacts',
        },
        ContactCriteria: {
          jobTitle: 'Job Title (4)',
          seniorityLevel: 'Seniority Level (3)',
          twoMoreContact: '2 more',
        },
        AccountCriteria: {
          employeeRange: 'Employee Range (3)',
          revenueRange: 'Revenue Range (1)',
          twoMoreAccount: '2 more',

        },
        Action: 'Run Search',
      },
      {
        SearchesId: {
          searchesId: 'Search #0003'
        },
        LastActivity: 'Today at 3:00 AM',
        NoOfContacts: {
          noOfContacts: '220 Contacts',
        },
        ContactCriteria: {
          jobTitle: 'Job Title (4)',
          seniorityLevel: 'Seniority Level (3)',
          twoMoreContact: '2 more',
        },
        AccountCriteria: {
          employeeRange: 'Employee Range (3)',
          revenueRange: 'Revenue Range (1)',
          twoMoreAccount: '2 more',

        },
        Action: 'Run Search',
      },
    ]
    // initialize grid actions column
    this.recentSearchesColumnActions = [
      {
        icon: 'pi pi-eye',
        tooltip: 'Account Quickview',
        width: '50px',
        onClick: (data) => { console.log('quickview event invoked for row data:', data); },
      },
      {
        icon: 'pi pi-cloud-download',
        tooltip: 'downoad',
        width: '100px',
        onClick: (data) => {
          console.log('downoad event invoked for row data:', data);
        },
      },
      {
        icon: 'pi pi-save',
        tooltip: 'Save to List',
        width: '100px',
        onClick: (data) => {
          console.log('save event invoked for row data:', data);
        },
      },
      {
        icon: 'pi pi-ellipsis-v',
        tooltip: 'menu',
        width: '100px',
        onClick: (data) => {
          console.log('menu event invoked for row data:', data);
        },
      },
    ];

  }




  /**
   *
   * @param $event
   */
  handleRowClick($event) { }

  /**
  *
  * @param $event
  */
  handleSortChange($event) { }

  /**
  *
  * @param $event
  */
  handleFilterChange($event) { }

  /**
  *
  * @param $event
  */
  handleServerSideEventPagination($event) { }

  /**
  *
  * @param $event
  */
  handleServerSideEventChange($event) { }
}


