import { Component, Input, OnInit } from '@angular/core';
import { IGridColumn, IGridColumnAction } from '@app/shared/models';

@Component({
  selector: 'app-saved-criteria-grid',
  templateUrl: './saved-criteria-grid.component.html',
  styleUrls: ['./saved-criteria-grid.component.scss']
})
export class SavedCriteriaGridComponent implements OnInit {

  @Input() totalRecords: any;
  @Input() selectedRows: any[] = [];
  @Input() savedSearches: any[] = [];
  @Input() personaCriterias: any[] = [];
  @Input() accountCriterias: any[] = [];

  count = 0;
  savedSearchesRows:any[]=[];
  savedSearchesColumns:IGridColumn[] = []
  savedSearchesColumnActions: IGridColumnAction[] = []
  savedPersonaRows:any[]=[];
  savedPersonaColumns:IGridColumn[] = []
  savedPersonaActions: IGridColumnAction[] = []
  accountCriteriaRows:any[]=[];
  accountCriteriaColumns:IGridColumn[] = []
  accountCriteriaColumnsActions: IGridColumnAction[] = []
  globalFilterData:any;
  dropdown: any;
  multiSelectData: any;


  constructor() { }

  ngOnInit(): void {
    this.setSavedSearchesInitialValues();
    this.setPersonaInitailValues();
    this.setAccountCriteriaInitialValues();

  }

/**
 * initialize saved search values
 */
setSavedSearchesInitialValues() {
  this.savedSearchesColumns = [
    {
      field: 'SavedSearchName',
      header: 'Saved Search Name',
      width: '200px',
      filtering: false
    },
    {
      field: 'LastUpdated',
      header: 'Last Updated',
      width: '200px',
      filtering: false
    },
    {
      field: 'ContactCriteria',
      header: 'Contact Criteria',
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

   this.savedSearchesRows = [
     {
       SavedSearchName: {
          searchName: 'Sales and Marketing',
          type:'Contacts',
          img: 'assets/icons/search.svg'
       },
       LastUpdated: 'Today at 09:00 AM',
       ContactCriteria: 'Job Title (4)  Seniority Level (3)  2 more  ',
       AccountCriteria: 'Job Title (4)  Seniority Level (3)  3 more  ',
       Action: 'Run Search',
     },
     {
       SavedSearchName: {
          searchName: 'Sales and Marketing',
          type:'Contacts',
          img: 'assets/icons/search.svg'
       },
       LastUpdated: 'Today at 2:00 AM',
       ContactCriteria: 'Job Title (4)  Seniority Level (3)  2 more  ',
       AccountCriteria: 'Job Title (6)  Seniority Level (3)  3 more  ',
       Action: 'Run Search',
     },
     {
       SavedSearchName: {
          searchName: 'Sales and Marketing',
          type:'Contacts',
          img: 'assets/icons/search.svg'
       },
       LastUpdated: 'Today at 3:00 AM',
       ContactCriteria: 'Job Title (4)  Seniority Level (3)  2 more  ',
       AccountCriteria: 'Job Title (4)  Seniority Level (3)  2 more  ',
       Action: 'Run Search',
     },
     {
       SavedSearchName: {
          searchName: 'Sales and Marketing',
          type:'Contacts',
          img: 'assets/icons/search.svg'
       },
       LastUpdated: 'Today at 4:00 AM',
       ContactCriteria: 'Job Title (4)  Seniority Level (3)  2 more  ',
       AccountCriteria: 'Job Title (4)  Seniority Level (3)  2 more  ',
       Action: 'Run Search',
     },
     {
       SavedSearchName: {
          searchName: 'Sales and Marketing',
          type:'Contacts',
          img: 'assets/icons/search.svg'
       },
       LastUpdated: 'Today at 5:00 AM',
       ContactCriteria: 'Job Title (4)  Seniority Level (3)  2 more  ',
       AccountCriteria: 'Job Title (4)  Seniority Level (3)  2 more  ',
       Action: 'Run Search',
     },

   ]
this.savedSearchesColumnActions = [
  {
    icon: 'pi pi-eye',
    tooltip: 'Account Quickview',
    width: '50px',
    onClick: (data) => { console.log('quickview event invoked for row data:', data);},
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
 * initialize persona values.
 */
setPersonaInitailValues() {
  this.savedPersonaColumns = [
    {
      field: 'PersonaName',
      header: 'Persona Name',
      width: '200px',
      filtering: false
    },
    {
      field: 'LastUpdated',
      header: 'Last Updated',
      width: '200px',
      filtering: false
    },
    {
      field: 'SavedCriteria',
      header: 'Saved Criteria',
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

   this.savedPersonaRows = [
     {
      PersonaName: {
          personaName: 'Sales and Marketing',
          img: 'assets/icons/contact.svg'
       },
       LastUpdated: 'Today at 5:00 AM',
       SavedCriteria: 'Job Title (4)  Seniority Level (3)  2 Job Funcion(3)  Skill(3)',
       Action: 'Run Search',
     },
     {
      PersonaName: {
          personaName: 'Sales and Marketing',
          img: 'assets/icons/contact.svg'
       },
       LastUpdated: 'Today at 1:00 AM',
       SavedCriteria: 'Job Title (4)  Seniority Level (3)  2 Job Funcion(3)  Skill(3)',
       Action: 'Run Search',
     },

   ]
  // initialize grid actions column
this.savedPersonaActions = [
  {
    icon: 'pi pi-eye',
    tooltip: 'Account Quickview',
    width: '50px',
    onClick: (data) => { console.log('quickview event invoked for row data:', data);},
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
 * initialize account criteria values
 */
setAccountCriteriaInitialValues() {
  this.accountCriteriaColumns = [
    {
      field: 'AccountCriteria',
      header: 'Account Criteria Name',
      width: '200px',
      filtering: false
    },
    {
      field: 'LastUpdated',
      header: 'Last Updated',
      width: '200px',
      filtering: false
    },
    {
      field: 'SavedCriteria',
      header: 'Saved Criteria',
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

   this.accountCriteriaRows = [
    {
      AccountCriteria: {
        accountCriteriaName: 'Sales Accounts',
         img: 'assets/icons/accounts.svg'
      },
      LastUpdated: 'Today at 1:00 AM',
      SavedCriteria: 'Employee Range (1) Revenue Range (1)  Max. No. of Accounts (1) Industries (20)',
      Action: 'Run Search',
    },
    {
      AccountCriteria: {
        accountCriteriaName: 'Sales Accounts',
         img: 'assets/icons/accounts.svg'
      },
      LastUpdated: 'Today at 2:00 AM',
      SavedCriteria: 'Employee Range (1) Revenue Range (1)  Max. No. of Accounts (1) Industries (20)',
      Action: 'Run Search',
    },
    {
      AccountCriteria: {
        accountCriteriaName: 'Sales Accounts',
         img: 'assets/icons/accounts.svg'
      },
      LastUpdated: 'Today at 3:00 AM',
      SavedCriteria: 'Employee Range (1) Revenue Range (1)  Max. No. of Accounts (1) Industries (20)',
      Action: 'Run Search',
    },
    {
      AccountCriteria: {
        accountCriteriaName: 'Sales Accounts',
         img: 'assets/icons/accounts.svg'
      },
      LastUpdated: 'Today at 4:00 AM',
      SavedCriteria: 'Employee Range (1) Revenue Range (1)  Max. No. of Accounts (1) Industries (20)',
      Action: 'Run Search',
    },
    {
      AccountCriteria: {
        accountCriteriaName: 'Sales Accounts',
         img: 'assets/icons/accounts.svg'
      },
      LastUpdated: 'Today at 5:00 AM',
      SavedCriteria: 'Employee Range (1) Revenue Range (1)  Max. No. of Accounts (1) Industries (20)',
      Action: 'Run Search',
    },
    {
      AccountCriteria: {
        accountCriteriaName: 'Sales Accounts',
         img: 'assets/icons/accounts.svg'
      },
      LastUpdated: 'Today at 6:00 AM',
      SavedCriteria: 'Employee Range (1) Revenue Range (1)  Max. No. of Accounts (1) Industries (20)',
      Action: 'Run Search',
    },


  ]

   this.accountCriteriaColumnsActions = [
    {
      icon: 'pi pi-eye',
      tooltip: 'Account Quickview',
      width: '50px',
      onClick: (data) => { console.log('quickview event invoked for row data:', data);},
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
   handleRowClick($event) {}

   /**
   *
   * @param $event
   */
  handleSortChange($event) {}

   /**
   *
   * @param $event
   */
  handleFilterChange($event) {}

   /**
   *
   * @param $event
   */
  handleServerSideEventPagination($event) {}

   /**
   *
   * @param $event
   */
  handleServerSideEventChange($event) {}

}


