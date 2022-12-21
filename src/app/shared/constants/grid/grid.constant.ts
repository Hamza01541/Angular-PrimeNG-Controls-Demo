import { IMenuFilter, GridFilterControlType } from '@app/shared/models/';

export const MenuFilters: IMenuFilter = {
  [GridFilterControlType.INPUT]: [
    { label: 'Starts with', value: 'startsWith' },
    { label: 'Contains', value: 'contains' },
    { label: 'Not contains', value: 'notContains' },
    { label: 'Ends With', value: 'endsWith' },
    { label: 'Equals', value: 'equals' },
    { label: 'Not equals', value: 'notEquals' },
  ],
  [GridFilterControlType.NUMERICINPUT]: [
    { label: 'Equals', value: 'equals' },
    { label: 'Not equals', value: 'notEquals' },
    { label: 'Less than', value: 'lt' },
    { label: 'Less than or equal to', value: 'lte' },
    { label: 'Greater than', value: 'gt' },
    { label: 'Greater than or equal to', value: 'gte' },
  ],
  [GridFilterControlType.CALENDAR]: [
    { label: 'Date is', value: 'dateIs' },
    { label: 'Date is not', value: 'dateIsNot' },
    { label: 'Date is before', value: 'dateBefore' },
    { label: 'Date is after', value: 'dateAfter' },
  ],
};
