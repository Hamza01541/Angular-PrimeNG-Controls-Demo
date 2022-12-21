import { Component, OnInit } from '@angular/core';
import { EGridColumnType, GridFilterControlType, IGridColumn, IGridColumnAction } from '@app/shared/models';

@Component({
  selector: 'result-section',
  templateUrl: './result-section.component.html',
  styleUrls: ['./result-section.component.scss']
})
export class ResultSectionComponent implements OnInit {
  count = 0;
  totalRecords:any;
  globalFilterData:any;
  dropdown: any;
  multiSelectData: any;
  recentContacts:any[];
  recentAccounts:any[];
  recentSearches:any[];
  savedSearches:any[];
  personaCriterias:any[];
  accountCriterias:any[];

  constructor() { }

  ngOnInit(): void {}

  getTotalResultCount(total: number) {
    this.count = total;
  }

  handleRowClick($event){}

  handleSortChange($event){}

  handleFilterChange($event){}

  handleServerSideEventPagination($event){}

  handleServerSideEventChange($event){}
}
