import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-saved-search-criteria',
  templateUrl: './saved-search-criteria.component.html',
  styleUrls: ['./saved-search-criteria.component.scss']
})
export class SavedSearchCriteriaComponent implements OnInit {

  @Input() personaList: any[];
  @Input() allSavedSearches: any[];
  @Input() set savedSearchAccount(value: any[]){
    if(value){
      this.savedSearchAccounts = value;
    }
  };

  @Output() showSavedSearchCriteriaSideBar = new EventEmitter();

  savedSearchAccounts: any[];


  constructor() { }

  ngOnInit(): void {}

  /**
   * open saved search criteria
   */
  openSavedSearchCriteria(){
    this.showSavedSearchCriteriaSideBar.emit();
  }
}
