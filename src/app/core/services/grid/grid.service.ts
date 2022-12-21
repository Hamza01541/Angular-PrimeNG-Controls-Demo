import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import {
  EGridSortDirection,
  GridFilterControlType,
  IGlobalFilter,
  IGridFilter,
  IGridSort,
  EGridColumnType,
  addColumn,
  addFilterColumn,
  addGlobalFilter,
  IGridColumn,
} from '@app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  constructor() {}

  /**
   *
   * @param event
   * Receives lazy event and returns after proper mapping
   */
  getGridFilters(event: LazyLoadEvent): IGridFilter[] {
    const filters = this.mapFilters(event);
    return this.handleMultiFilterField(filters);
  }

  /**
   * @param filters
   * Receives filters and returns array after removing duplicates
   * and creating comma separated values for same filters
   */
  handleMultiFilterField(filters: IGridFilter[]): IGridFilter[] {
    return filters
      .map((x, i, arr) =>
        arr.some(
          (y, idx) =>
            y.field?.toLowerCase() === x.field?.toLowerCase() && i !== idx
        )
          ? {
              ...x,
              value: arr
                .filter(
                  (z) => z.field?.toLowerCase() === x.field?.toLowerCase()
                )
                .map((a) => a.value)
                .join(),
            }
          : x
      )
      .filter((f, i, arr) => arr.findIndex((x) => x.value === f.value) === i);
  }

  // Prepare basic grid filters
  prepareBasicFilters(event: LazyLoadEvent): IGridFilter[] {
    return this.mapFilters(event);
  }

  /**
   * Checks if filters has values then converts global filter values type into IGridFilter.
   */
  prepareGlobalFilters(globalFilters: IGlobalFilter[]): IGridFilter[] {
    const globalData: IGridFilter[] = [];

    globalFilters.forEach((filter: IGlobalFilter) => {
      if (
        ((typeof filter.value === 'string' || Array.isArray(filter.value)) &&
          filter.value.length) ||
        (typeof filter.value !== 'string' &&
          !Array.isArray(filter.value) &&
          filter.value) ||
        (typeof filter.value === 'boolean' && filter.value !== null)
      ) {
        globalData.push({
          field: filter.field,
          matchMode:
            filter.type === GridFilterControlType.MULTISELECT
              ? 'in'
              : filter.matchMode,
          operator: 'and',
          value: this.setGlobalFilterValue(filter),
        });
      }
    });

    return globalData;
  }

  // set global filter value
  setGlobalFilterValue(
    filter: IGlobalFilter
  ): string | number | Date | boolean {
    switch (filter.type) {
      case GridFilterControlType.MULTISELECT:
        return (filter.value as any[]).join(',');
      case GridFilterControlType.CALENDAR:
        return this.getFormattedDate(filter.value as Date);
      case GridFilterControlType.CHECKBOX:
        return filter.value ? 1 : 0;
      default:
        return filter.value as string;
    }
  }

  // set basic filter value
  setBasicFilterValue(filter: any): any {
    if (filter instanceof Date) {
      return this.getFormattedDate(filter);
    } else if (typeof filter === 'boolean') {
      return filter ? 1 : 0;
    } else {
      return filter;
    }
  }

  /**
   *
   * @param param
   * Receives lazy event and returns sort array
   */
  getGridSorts({ multiSortMeta }: LazyLoadEvent): IGridSort[] {
    return (multiSortMeta || []).map(
      ({ field, order }, i): IGridSort => ({
        field,
        direction: order > 0 ? EGridSortDirection.ASC : EGridSortDirection.DESC,
        priority: i + 1,
      })
    );
  }

  /**
   *
   * @param event
   * Handles default and lookup filters
   */
  mapFilters(event: any): IGridFilter[] {
    const filters: IGridFilter[] = [];
    Object.entries(event.filters).forEach(([field, value]: any) => {
      if (Array.isArray(value)) {
        (value as IGridFilter[]).forEach(
          ({ matchMode, operator, value: filter }) => {
            if (filter !== null) {
              filters.push({
                field,
                matchMode,
                operator,
                value: this.setBasicFilterValue(filter),
              });
            }
          }
        );
      } else {
        if (value.value !== '') {
          switch (typeof value.value) {
            case 'boolean':
              filters.push({
                field,
                matchMode: 'equals',
                operator: 'and',
                value: value.value ? 1 : 0,
              });
              break;
            case 'string':
              filters.push({
                field,
                matchMode: value.matchMode,
                operator: 'and',
                value: value.value,
              });
              break;
            case 'object':
              if (value.value instanceof Date) {
                filters.push({
                  field,
                  matchMode: 'equal',
                  operator: 'and',
                  value:
                    value.value instanceof Date
                      ? this.getFormattedDate(value.value)
                      : value.value,
                });
              } else {
                (value.value || []).forEach((x: any) => {
                  filters.push({
                    field,
                    matchMode: value.matchMode,
                    operator: 'and',
                    value: x.value,
                  });
                });
              }
              break;
            default:
              null;
          }
        }
      }
    });
    return filters;
  }

  /**
   *
   * @param event
   * Receives lazy event and returns page number
   */
  getGridPagination(event: any): number {
    return isNaN(event.first / event.rows) ? 1 : event.first / event.rows + 1;
  }

  // get formatted date
  getFormattedDate(value: Date): string {
    return new Date(`${value} Z`).toISOString().slice(0, 10);
  }

  // add simple grid column without
  addColumn(columnInfo: addColumn): IGridColumn {
    const column: IGridColumn = {
      field: columnInfo.field,
      header: columnInfo.header,
      width: columnInfo.width,
      type: columnInfo.type,
      format: columnInfo.format,
      data: columnInfo.data,
      filtering: columnInfo.filtering,
      hidden: columnInfo.hidden,
      sorting: columnInfo.sorting,
      filter: columnInfo.filter,
      hyperlink: columnInfo.hyperlink,
    };

    return column;
  }

  // add simple input grid column
  addInputColumn(
    filterColumnInfo: addColumn,
    showFilter: boolean = true
  ): IGridColumn {
    if (showFilter) {
      filterColumnInfo.filter = { type: GridFilterControlType.INPUT };
    }
    return this.addColumn(filterColumnInfo);
  }

  // add simple numeric grid column without
  addNumericColumn(
    columnInfo: addColumn,
    showFilter: boolean = true
  ): IGridColumn {
    if (showFilter) {
      columnInfo.filter = { type: GridFilterControlType.NUMERICINPUT };
    }
    return this.addColumn(columnInfo);
  }

  // add simple calendar grid column without
  addCalendarColumn(
    columnInfo: addColumn,
    showFilter: boolean = true
  ): IGridColumn {
    if (showFilter) {
      columnInfo.filter = { type: GridFilterControlType.CALENDAR };
    }
    return this.addColumn(columnInfo);
  }

  // add simple boolean grid column without
  addBooleanColumn(
    columnInfo: addColumn,
    showFilter: boolean = true
  ): IGridColumn {
    if (showFilter) {
      columnInfo.filter = { type: GridFilterControlType.CHECKBOX };
    }
    return this.addColumn(columnInfo);
  }

  // add simple dropdown grid column without
  addDropdownColumn(
    columnInfo: addColumn,
    showFilter: boolean = true
  ): IGridColumn {
    if (showFilter) {
      columnInfo.filter = { type: GridFilterControlType.DROPDOWN };
    }
    return this.addColumn(columnInfo);
  }

  // add grid column with built-in filter
  addFilterColumn(filterColumnInfo: addFilterColumn): IGridColumn {
    const column: any = {
      field: filterColumnInfo.field,
      header: filterColumnInfo.header,
      filter: { type: filterColumnInfo.filter },
      filtering: filterColumnInfo.filtering,
      hidden: filterColumnInfo.hidden,
      width: filterColumnInfo.width,
    };

    return column;
  }

  // add date grid column with
  addDateColumn(dateColumnInfo: addFilterColumn): IGridColumn {
    const column: any = {
      field: dateColumnInfo.field,
      header: dateColumnInfo.header,
      type: EGridColumnType.DATE,
      filtering: dateColumnInfo.filtering,
      format: dateColumnInfo.format,
      width: dateColumnInfo.width,
    };
    return column;
  }

  // add grid global filter with
  addGlobalFilter(globelFilterInfo: addGlobalFilter) {
    const column = {
      field: globelFilterInfo.field,
      displayText: globelFilterInfo.displayText,
      type: globelFilterInfo.type,
      data: globelFilterInfo.data,
      value: globelFilterInfo.value,
      matchMode: globelFilterInfo.matchMode,
      operator: globelFilterInfo.operator,
    };
    return column;
  }

  // add global input filter
  addGlobalInputFilter(globelFilterInfo: addGlobalFilter) {
    globelFilterInfo.type = GridFilterControlType.INPUT;
    return this.addGlobalFilter(globelFilterInfo);
  }

  // add global dropdown filter
  addGlobalDropdownFilter(globelFilterInfo: addGlobalFilter) {
    globelFilterInfo.type = GridFilterControlType.DROPDOWN;
    return this.addGlobalFilter(globelFilterInfo);
  }

  // add global boolean filter
  addGlobalBooleanFilter(globelFilterInfo: addGlobalFilter) {
    globelFilterInfo.type = GridFilterControlType.CHECKBOX;
    return this.addGlobalFilter(globelFilterInfo);
  }
}
