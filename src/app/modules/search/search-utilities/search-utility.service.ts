import { Injectable } from '@angular/core';
import { HelperService } from '@app/core/services';
import { Contact } from '@app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class SearchUtilityService {
  dsData: Contact;
  constructor(
    private helperService: HelperService
  ) {
    this.dsData = new Contact;

  }

  /**
   * This method checks for only contact criteria.
   * We omits the other criteria to check only contact criteria.
   * @param contactCriteria 
   * @returns boolean
   */
  validateContactCriteria(contactCriteria: any) {
    let criteria = Object.keys(contactCriteria);
    let keysToOmit = ['high_quality', 'is_current', 'company_criteria', 'company_ids', 'employee'];
    criteria = criteria.filter(key => !keysToOmit.includes(key));
    return criteria.length ? true : false;
  }

  /**
   *
   * @returns company static filters lists
   */
  getCompanyFilters() {
    let companyFilters = [{ name: 'Filter By Companies Name', id: 'filter_company_by_name' },
    { name: 'Filter By Criteria', id: 'filter_company_by_criteria' }
    ];
    return companyFilters;
  }

  /**
   * Modifies PDL response as DS response
   * @param apiResponse 
   * @returns Array of DS response
   */
  formatTPSearchResponse(apiResponse: any) {
    let formattedArray = [];
    apiResponse.forEach((pdlData: any) => {
      this.dsData = new Contact;
      this.dsData.first_name = pdlData.first_name ? this.helperService.upperCaseInitialWholeLine(pdlData.first_name) : '';
      this.dsData.last_name = pdlData.last_name ? this.helperService.upperCaseInitialWholeLine(pdlData.last_name) : '';
      this.dsData.company_name = pdlData.job_company_name ? this.helperService.upperCaseInitialWholeLine(pdlData.job_company_name) : '';
      this.dsData.headline = pdlData.job_title ? this.helperService.upperCaseInitialWholeLine(pdlData.job_title) : '';
      this.dsData.title = this.dsData.headline;
      this.dsData.linkedin_url = pdlData.linkedin_url ? `https://${pdlData.linkedin_url}` : '';
      this.dsData.li_member_id = pdlData.linkedin_id || '';
      this.dsData.is_from_pdl = true;

      formattedArray.push({ contact: this.dsData });
    });

    return formattedArray;
  }
}
