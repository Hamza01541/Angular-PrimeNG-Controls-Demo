import { Injectable } from '@angular/core';
import { HelperService } from '@app/core/services';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private helperService: HelperService) {
  }

  /**
   * Returns Array of object of static tenures.
   * @returns Array
   */
  buildTenure() {
    let tenureArray: any = [
      { name: "0 to 3 Months", low: 0, high: 3 },
      { name: "4 to 6 Months", low: 4, high: 6 },
      { name: "6 to 12 Months", low: 6, high: 12 },
      { name: "1 to 2 Years", low: 12, high: 24 },
      { name: "3 to 5 Years", low: 25, high: 60 },
      { name: "6 to 10 Years", low: 61, high: 120 },
      { name: "More than 10 years", low: 121 }
    ];
    return tenureArray;
  }

  /**
  * Handle  range params.
  * @param inputArray 
  * @returns 
  */
  handleRanges(inputArray: any) {
    let sortedArray: Array<any> = this.helperService.sortByKey(inputArray, 'order');
    // Special Case for handling Revenue.
    let specialRevenue = '< 1 M';
    if (sortedArray.length > 1) {
      if (sortedArray[0].order === 1 && sortedArray[0].name === specialRevenue) {
        sortedArray[0].range.low = 1;
        delete sortedArray[0].range.high;
      }
    }

    let head = sortedArray[0];
    let tail = sortedArray[sortedArray.length - 1];
    let rangeParams = null;

    if (head) {
      if (head.range.low && tail.range.high) {
        rangeParams = { low: head.range.low, high: tail.range.high };
      } else {
        if (head.name == specialRevenue) {
          delete head.range.low;
          rangeParams = { high: 1 };
        } else {
          rangeParams = { low: head.range.low };
        }
      }
    }
    return rangeParams;
  }

  /**
* Builds employee ranges.
* @returns []
*/
  getEmployeeRanges() {
    let employeeRanges = [];
    let ranges = ['1-10', '11-20', '21-50', '51-100', '101-200',
      '201-500', '501-1000', '1001-2000', '2001-5000', '5001-10000', '10000'];

    let count = 0;
    ranges.forEach(range => {
      count = count + 1;
      if (range !== '10000') {
        let lowRange = range.split('-')[0];
        let highRange = range.split('-')[1];

        employeeRanges.push({
          name: `${lowRange} - ${highRange} Employees`,
          range: { low: +lowRange, high: +highRange },
          order: count
        });
      } else {
        employeeRanges.push({ name: `${range}+ Employees`, range: { low: +range }, order: count });
      }
    })

    return employeeRanges;
  }

  /**
   * Builds revenue ranges.
   * @returns 
   */
  getRevenueRanges() {
    let revenueRanges = [];
    let ranges = ['1', '1-10', '11-50', '51-100', '101-200',
      '201-500', '501-1000', '1000'];

    let count = 0;
    ranges.forEach(range => {
      count = count + 1;

      if (range == '1000' || range == '1') {
        if (range == '1') {
          revenueRanges.push({ name: `< ${range} M`, range: { high: +range }, order: count });
        }

        if (range == '1000') {
          revenueRanges.push({ name: `${range}+ M`, range: { low: +range }, order: count });
        }

      } else {
        let lowRange = range.split('-')[0];
        let highRange = range.split('-')[1];

        revenueRanges.push({
          name: `${lowRange}M - ${highRange}M`,
          range: { low: +lowRange, high: +highRange },
          order: count
        });
      }
    })

    return revenueRanges;
  }

  /**
   * Builds Company Types
   * @returns 
   */
  getCompanyTypes() {
    return [
      { id: 1, name: 'Education' }, { id: 2, name: 'Government' }, { id: 3, name: 'Nonprofit' },
      { id: 4, name: 'Privately Held' }, { id: 5, name: 'Public Company' }, { id: 6, name: 'Subsidiary' }];
  }
}
