// /
export interface IGridColumn {
  header: string;
  field: string;
  type?: EGridColumnType;
  hidden?: boolean;
  hyperlink?: string;
  sorting?: boolean;
  filtering?: boolean;
  filter?: IGridFilterType;
  format?: string; // For more format options. visit https://angular.io/api/common/DatePipe
  data?: any;
  width?: string;
  permissions?: IPermission[];
  value?: any;
}

export interface IPermission {
  type: EPermissionType;
  roles: string[];
}

export enum EPermissionType {
  EDIT = 'edit',
  VIEW = 'view',
}


export interface IGridDataExport {
  rows: any[];
  headings: string[];
}

export interface ISelectItem {
  label: string;
  value: string;
}

export interface IGridFilterType {
  type: GridFilterControlType;
  data?: ISelectItem[];
}

export enum GridFilterControlType {
  INPUT = 'input',
  DROPDOWN = 'dropdown',
  CHECKBOX = 'checkbox',
  CALENDAR = 'calendar',
  MULTISELECT = 'multi-select',
  NUMERICINPUT = 'numberic_input',
}

export enum EGridSortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export enum EGridColumnType {
  LINK = 'link',
  TEXT = 'text',
  NUMERIC = 'numeric',
  DATE = 'date',
  BOOLEAN = 'boolean',
  DROPDOWN = 'dropdown',
}

export interface IGlobalFilter extends IGridFilterType, IGridFilter {
  displayText: string;
}

export interface IPrimeNgSort {
  multisortmeta: { field: string; order: number };
}

export interface IPrimeNgFilterItem {
  matchMode: string;
  operator: string;
  value: string | number | boolean | Date | any;
}

export interface IPrimeNgFilter {
  filteredValue: any[];
  filters: Record<string, IPrimeNgFilterItem[] | IPrimeNgFilterItem>;
}

export interface IGridFilter {
  field: string;
  matchMode: string;
  operator: string;
  value: string | number | boolean | Date | any[];
}

export interface IGridSort {
  field: string;
  direction: EGridSortDirection;
  priority: number;
}

export class IGridServerSideEvent {
  filters?: IGridFilter[];
  sorts?: IGridSort[];
  page?: number;
  pageSize?: number;
}

export interface IGridPaginationEvent {
  first: number;
  rows: number;
}

export interface IGridColumnAction {
  icon?: string; // Uses primeng/font-awesome icons. Example: 'pi pi-check'
  tooltip?: string;
  width?: string;
  onClick?: (row: any) => void;
}

export interface IGridRowAction {
  title: string;
  class?: string;
  onClick: (row: any) => void;
}

export enum EGridSelectionType {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

export type MenuFilterControls =
  | GridFilterControlType.INPUT
  | GridFilterControlType.NUMERICINPUT
  | GridFilterControlType.CALENDAR;

export type IMenuFilter = Record<MenuFilterControls, ISelectItem[]>;

export interface addColumn {
  control?: EGridColumnType;
  field?: string;
  header?: string;
  width?: string;
  type?: EGridColumnType;
  format?: string;
  data?: any;
  filtering?: boolean;
  hidden?: boolean;
  hyperlink?: string;
  sorting?: boolean;
  filter?: IGridFilterType;
}

export interface addFilterColumn {
  control?: GridFilterControlType;
  field?: string;
  header?: string;
  filter?: GridFilterControlType;
  filtering?: boolean;
  hidden?: boolean;
  width?: string;
  format?: string;
}

export interface addGlobalFilter {
  field?: string;
  displayText?: string;
  type?: GridFilterControlType;
  data?: any;
  value?: any;
  matchMode?: string;
  operator?: string;
}
