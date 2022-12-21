import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-siderbar-menu',
  templateUrl: './search-siderbar-menu.component.html',
  styleUrls: ['./search-siderbar-menu.component.scss']
})
export class SearchSiderbarMenuComponent implements OnInit {
  @Input() gridColumns: any[] = []
  @Input() selectedColumns: any[] = []
  @Input() set  filteredColumnsHeaders(filteredColumnsHeaders: any[]) {
    if(filteredColumnsHeaders) {
      this.selectedColumns = filteredColumnsHeaders
    }
  }

  @Output() closedSideBar = new EventEmitter();
  @Output() columnsSelection = new EventEmitter();
  @Output() onSearching = new EventEmitter();

  sidebar: boolean = true;
  searchText: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
     this.selectedColumns = this.gridColumns;
  }

  /**
  * close Right SideBar
  */
  closeRightSideBar() {
    this.sidebar = false;
    this.closedSideBar.emit(this.sidebar);
   }

 /**
  * triggers on dragging columns.
  * @param event
  */
   drop1(event) {
    this.selectedColumns[event.previousContainer.data.index] = event.container.data.item;
    this.selectedColumns[event.container.data.index] = event.previousContainer.data.item;
 }

/**
 * on Click, it saves default columns.
 */
   saveDefaultColumns() {
    const selectedColumns = this.selectedColumns.filter((x) => x.selected);
    if (selectedColumns.length) {
    this.columnsSelection.emit(selectedColumns)
    this.closeRightSideBar();
   }
   }

   /**
    * triggers on searching.
    * @param event
    */
   onSearch(event) {
     const searchValue =  event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
     this.onSearching.emit(searchValue);

   }

  /**
   * triggers on clearing search field
   * @param event
   */
   onClearSearch(event) {
    if (this.searchText === '') {
      this.selectedColumns = this.gridColumns
     }
    }
}
