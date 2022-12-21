import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  Optional,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { GridService } from '@app/core/services/grid/grid.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {
  IGridSort,
  IPrimeNgSort,
  IPrimeNgFilter,
  IGridPaginationEvent,
  EGridSortDirection,
  IGridDataExport,
  EPermissionType,
} from '@app/shared/models';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import {
  EGridColumnType,
  EGridSelectionType,
  IGlobalFilter,
  IGridColumn,
  IGridColumnAction,
  IGridFilter,
  IGridRowAction,
  IGridServerSideEvent,
} from '@app/shared/models';
// import { EPermissionType, IPermission, IUserInfo } from '@app/shared/models';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})

export class GridComponent implements OnInit {
  @ViewChildren('gridRow') gridRow: QueryList<ElementRef>;
  serverFilters: IGridServerSideEvent = {};
  rowsData: any[];
  roles: string[] = [];
  isColumnHidden: boolean = false;
  selectedItems: number = 0;
  showBulkRow: boolean = false
  showClearSelection: boolean = false;
  currentselectedRows: any[] = [];


  // Maintains previous state of rows being edited
  editRowsRecords: { [key: string]: any } = {};

  // Maintains record of rows being edited
  editingRowKeys: { [key: string]: any } = {};

  // Selects items in the grid based on passed on data
  @Input() selectedRows: any = [];

  private globalData: IGridFilter[] = [];

  // Stores selected columns
  private _selectedColumns: IGridColumn[] = [];

  // Prop to handle loader of grid
  @Input() public loading = false;

  // Boolean prop to check where selected is allowed or not.
  @Input() allowSelection = true;

  // Set column width of selected row.
  @Input() selectionColumnWidth: string = '80px';

  // Boolean prop to allow export to pdf.
  @Input() allowExportToPdf = false;

  @Input() currentGrid: string = '';

  // Boolean prop to allow export to excel.
  @Input() allowExportToExcel = false;

  // If true, enables options to perform CRUD using inline row functionality
  @Input() useInlineCRUD = false;

  // Array of row actions
  @Input() rowActions: IGridRowAction[] = [];

  // Sets selection type i.e: single/multiple selection
  @Input() selectionType: EGridSelectionType = EGridSelectionType.MULTIPLE;

  // Unique key requires for built-in row selection of primeNg grid
  @Input() dataKey: string;

  // Flag in case table is scrollable
  @Input() scrollable = false;

  // Sets scroll height for the table
  @Input() scrollHeight;

  @Input() newGridRow = {};

  @Input() filtering = true;

  @Input() rowHover: boolean = false;
  showSearchBar: any;
  isSideBar: boolean;
  /**
   * Stops the loader and sets the data to grid
   * Clears the editing stack
   * Scrolls to selected element if selection found
   */
  @Input() set rows(data: any[]) {
    this.loading = false;
    this.rowsData = data;
    this.currentselectedRows = [... this.rowsData]
    // Cleaning the editing stack
    this.editingRowKeys = {};
    this.editRowsRecords = {};

    setTimeout(() => {
      if (data && data.length > 0 && this.selectedRows) {
        const selectedElementRef = this.gridRow.find(
          (x) => x.nativeElement.id === this.selectedRows[this.dataKey]
        );
        selectedElementRef &&
          (selectedElementRef.nativeElement as HTMLTableRowElement).scrollIntoView(
            { behavior: 'smooth' }
          );
      }
    }, 0);
  }

  // Global filter server request
  @Input() set globalFilterData(globalFilters: IGlobalFilter[]) {
    this.loading = true;
    this.globalData = this.gridService.prepareGlobalFilters(globalFilters);
    const serverFilterValues = JSON.parse(JSON.stringify(this.serverFilters));
    serverFilterValues.filters = this.serverFilters.filters
      ? this.serverFilters.filters.concat(this.globalData)
      : this.globalData;
    this.onServerSideEventChange.emit(serverFilterValues);
  }

  // Input decorator to receive columns to be displayed in header
  @Input() columns: IGridColumn[] = [];

  @Input() permissions: any[] = [];

  // Optional prop to handle toggling of columns
  @Input() allowColumnToggle = false;

  // Optional prop to handle lookup filters
  @Input() lookupFilters = false;

  // Optional prop to handle pagination
  @Input() pagination = false;

  // Optional prop to handle show CurrentPage Report
  @Input() showCurrentPageReport = false;

  // Displays total number of records
  @Input() totalRecords = 0;

  // Sets number of rows to be shown the grid
  @Input() defaultRows: number;

  @Input() columnActions: IGridColumnAction[] = [];

  // Decides the grid's behavior either for client side or server side events
  @Input() useServerSideEvents = false;

  // Output event to handle row click
  @Output() onRowClick: EventEmitter<any> = new EventEmitter();

  // Output event to trigger on sort change
  @Output() onSortChange: EventEmitter<IGridSort> = new EventEmitter();

  // Output event to trigger on filter change
  @Output() onFilterChange: EventEmitter<any> = new EventEmitter();

  // Calls whenever a lazy event is dispatched
  @Output()
  onServerSideEventChange: EventEmitter<IGridServerSideEvent> = new EventEmitter();

  // Output event to trigger on pagination
  @Output()
  onPageChange: EventEmitter<IGridPaginationEvent> = new EventEmitter();

  // Dispatch output event trigger on edit row
  @Output() onRowUpdate = new EventEmitter();

  // Dispatch output event trigger on delete row
  @Output() onDeleteRow = new EventEmitter();

  //Dispatch output event trigger on add row
  @Output() onAddRow = new EventEmitter();

  isGridHidden: boolean = false;
  filteredColumnsHeaders: any[] =[];
  constructor(
    private gridService: GridService,
    private cd: ChangeDetectorRef,
    @Optional() public config: DynamicDialogConfig,
    @Optional() public ref: DynamicDialogRef
  ) { }

  get selectedColumns(): IGridColumn[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: IGridColumn[]) {
    this._selectedColumns = this.columns.filter((col) => val.includes(col));
  }

  /**
   * Assignment of selected columns on page load
   */
  ngOnInit(): void {
    // apply global permissions on entire grid
    this.applyGridPermissions();
    this._selectedColumns = this.columns.filter((x) => !x.hidden);
    this.cd.detectChanges();
  }
 
  /**
   *  apply global permissions on entire grid
   */
  applyGridPermissions() {
    if (this.permissions && this.permissions.length > 0) {
      let hasValidEditPermission = false;

      // check if any column has any permission
      let hasColumnPermissions = this.columns.some(
        (x) => x.permissions && x.permissions.length > 0
      );

      this.permissions.forEach((permission) => {
        let isValid: boolean = false;

        permission.roles.forEach((role) => {
          if (!isValid && this.roles && this.roles.includes(role)) {
            isValid = true;
          }
        });

        if (
          permission.type === EPermissionType.VIEW &&
          !hasValidEditPermission
        ) {
          this.useInlineCRUD = false;
          if (!isValid && !hasColumnPermissions) {
            this.isGridHidden = true;
          }
        } else if (permission.type === EPermissionType.EDIT) {
          if (isValid) {
            this.isGridHidden = false;
            hasValidEditPermission = true;
            this.useInlineCRUD = true;
          } else {
            this.useInlineCRUD = false;
          }
        }
      });
    }
  }

  /**
   *
   * @param rowData
   * Passes data of clicked row to parent
   */
  handleRowClick(rowData) {
    this.onRowClick.emit(rowData);
  }

  /**
   *
   * @param columnData
   * Passes sorting information to parent on sort change
   */
  handleSortChange(event: IPrimeNgSort) {
    let sortDirection = null;
    let sortField: string = '';
    if (event.multisortmeta && event.multisortmeta[0].order) {
      sortDirection =
        event.multisortmeta[0].order == 1
          ? EGridSortDirection.ASC
          : EGridSortDirection.DESC;
      sortField = event.multisortmeta[0].field;
    }
    let sorts: IGridSort = {
      field: sortField,
      direction: sortDirection,
      priority: null,
    };
    this.onSortChange.emit(sorts);
  }

  /**
   *
   * @param event
   * Passes applied filters to parent on filter change
   */
  handleFilterChange(event: IPrimeNgFilter) {
    this.onFilterChange.emit(event);
  }

  /**
   *
   * @param event : Event
   * @param columnAction : IGridColumnAction
   * @param row : any
   * Stop the click event propagation to parent
   * Callbacks the row data to parent
   */
  handleActionClick(event: Event, columnAction: IGridColumnAction, row: any) {
    event.stopPropagation();
    columnAction.onClick(row);
  }

  /**
   *
   * @param event : LazyLoadEvent
   * Triggers everytime a server side filter is trigger
   */
  handleServerSideEvents(event: LazyLoadEvent) {
    this.loading = true;
    this.serverFilters = {
      filters: this.lookupFilters
        ? this.gridService.getGridFilters(event)
        : this.gridService.prepareBasicFilters(event),
      sorts: this.gridService.getGridSorts(event),
      ...(this.pagination && {
        page: this.gridService.getGridPagination(event),
        pageSize: event.rows || 10,
      }),
    };

    const serverFilterValues = JSON.parse(JSON.stringify(this.serverFilters));
    serverFilterValues.filters = this.serverFilters.filters.concat(
      this.globalData
    );
    this.onServerSideEventChange.emit(serverFilterValues);
  }

  /**
   * @param event
   * Passes applied pagination to parent on page change
   */
  handleServerSidePagination(event: IGridPaginationEvent) {
    this.onPageChange.emit(event);
  }

  /**
   *
   * @param row
   * Sets values to editable row
   * Row's data is preseved to prevent mutation
   * Row dataKey is preserved to keep the row unique and in editable state as long as not saved
   */
  onRowEditInit(row: any) {
    Object.entries(row).forEach(([key, value]) => {
      this.columns.forEach((col) => {
        if (
          col.field?.toLowerCase() === key?.toLowerCase() &&
          col.type === EGridColumnType.DATE
        )
          row[key] = new Date(value as string);
      });
    });

    this.editRowsRecords[row[this.dataKey]] = { ...row };
    this.editingRowKeys[row[this.dataKey]] = true;
  }

  /**
   *
   * @param row
   * Passes the edited or newly created data to parent
   * In case of newly created data, dataKey and isNew prop is removed
   */
  onRowEditSave(row: any) {
    if (this.useServerSideEvents) {
      this.loading = true;
    }
    if (row.isNew) {
      const { isNew, ...newRowObj } = row;
      delete newRowObj[this.dataKey];
      this.onAddRow.emit(newRowObj);
    } else {
      this.onRowUpdate.emit(row);
    }
    this.editingRowKeys[row[this.dataKey]] = true;
  }

  /**
   *
   * @param row : any
   * @param index : number
   * Clears out the edit row and replace with readable one
   */
  onRowEditCancel(row: any, index: number) {
    if (row.isNew) {
      this.rowsData.splice(index, 1);
    } else {
      this.rowsData[index] = this.editRowsRecords[row[this.dataKey]];
      delete this.editRowsRecords[row[this.dataKey]];
    }
    delete this.editingRowKeys[row[this.dataKey]];
  }

  /**
   *
   * @param row
   * Sends the row payload to parent for deletion
   */
  onRowDeleteInit(row) {
    if (this.useServerSideEvents) {
      this.loading = true;
    }
    this.onDeleteRow.emit(row);
  }

  /**
   *
   * Export to PDF
   */
  exportPdf() {
    var exportData = this.setExportData([...this.rowsData], true);
    let doc = new jsPDF('p', 'pt');
    doc.table(1, 1, exportData.rows, exportData.headings, { autoSize: true });
    doc.save('Export.pdf');
  }

  /**
   *  Sub-function to set rows for export to Pdf, and Excel
   * @rows param for rows
   * @isExcel param for export to excel indication
   */
  setExportData(rows: any[] = [], isPdf: boolean = false): IGridDataExport {
    const headings = this.columns.map((column) => column.field);
    rows.forEach((row) => {
      for (var prop in row) {
        if (!headings.includes(prop)) {
          delete row[prop];
        }
        if (isPdf) {
          row[prop] =
            !row[prop] && typeof row[prop] !== 'boolean'
              ? ''
              : row[prop].toString();
        }
      }
    });
    return { rows, headings };
  }

  /**
   *
   * Export to Excel
   */
  exportExcel() {
    var exportData = this.setExportData([...this.rowsData]);
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(exportData.rows);
      const workbook = {
        Sheets: { sheet1: worksheet },
        SheetNames: ['sheet1'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'Export.xlsx');
    });
  }

  /**
   *
   * Export to excel (sub-method)
   */
  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
      saveAs(data, fileName);
    });
  }

  /**
   *  hab\ndes header check box toggle.
   */
  handleHeaderCheckboxToggle(e) {
    this.showBulkRow = !this.showBulkRow
    this.currentselectedRows = [...this.rowsData]
    this.selectedItems =   this.currentselectedRows.length;
  }

  /**
   * selects all records on grid.
   */
  selectAllRecords() {
    this.selectedItems = this.rowsData.length;
    this.selectedRows = this.rowsData;
    this.showClearSelection = true;

  }

  /**
   * clears all selected rows .
   */
  clearSelection() {
    this.showBulkRow = false
    this.showClearSelection = false;
    this.selectedRows = [];
    this.selectedItems = this.rowsData.length;
  }

  /**
   * shows search bar on clicking search icon.
   */
  searchBar() {
    this.showSearchBar = !this.showSearchBar
  }

  /**
   * calls on row selection.
   */
  onRowSelection(event) {
    this.currentselectedRows.push(event.data)
    this.selectedItems = this.currentselectedRows.length
  }

  /**
   * calls on row unselection.
   */
  onRowUnSelection(event) {
    this.currentselectedRows.splice(0,1)
    this.selectedItems = this.currentselectedRows.length;
  }

  /**
   * open grid sidebar
   */
  openSideBar(){
    this.isSideBar = true;
  }

   /**
   * close grid sidebar
   * @param event
   */
    closeSideBar(event: any) {
      this.isSideBar = event;
    }

 /**
  * triggers on columns selection in column selection side menu.
  * @param selectedColumns.
  */   
    columnsSelection(selectedColumns) {
      this.selectedColumns =  selectedColumns
    }

/**
 *  filtering columns in column selction side menu.
 * @param value 
 */
    onSearching(value) {
    this.filteredColumnsHeaders  =  this.columns.filter((col) => col.field.includes(value));
    }
}
