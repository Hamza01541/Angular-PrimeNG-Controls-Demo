import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '@app/core/services/request.service';
import { ApiUrl } from '@app/shared/constants';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { RefreshStatus } from '@app/shared/models';
import { HelperService } from '@app/core/services';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchingService {
  refreshStatus: RefreshStatus;
  constructor(private requestService: RequestService,
    private storageService: LocalStorageService,
    private helperService: HelperService) {
    this.refreshStatus = { class_name: 'no-data', process_status: 'No Data', icon_class: 'pi pi-times' };
  }

  /**
   * Returns the lists of contacts upon the provided search term;
   * @param searchText
   * @returns {Observable<any>}
   */
  getContactsByTerm(searchText: string): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.contactSearch}?page_no=0&q=${searchText}`);
  }

  /**
   * Returns detailed contact profile
   * @param contactId
   * @returns {Observable<any>}
   */
  getContactProfile(contactId: string): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrlV1}/${ApiUrl.contacts}/${contactId}/${ApiUrl.profile}`);
  }

  /**
   * Returns contact refresh status
   * @param position
   * @param isCurrentPosition
   * @returns Refresh status of position
   */
  fetchCurrentPositionDetails(position: any, isCurrentPosition: boolean) {
    if (!isCurrentPosition) {
      if (position && position.length) {
        position = position[0];
      }
    }

    let status = {
      work_email: null, corp_phone: null, direct_phone: null,
      mobile_phone: null, personal_email: null
    };

    status.work_email = this.getInfoRefreshStatus(position?.work_email_data, 'email');
    status.corp_phone = this.getInfoRefreshStatus(position?.corporate_phone_data, 'corporate_phone');
    status.direct_phone = this.getInfoRefreshStatus(position?.direct_phone_data, 'direct_phone');
    status.mobile_phone = this.getInfoRefreshStatus(position?.mobile_number_data, 'mobile_number');
    status.personal_email = this.getInfoRefreshStatus(position?.personal_email_data, 'personal_email');
    return status;
  }

  private getInfoRefreshStatus(data: any, type: any) {
    if (data && (data.running_process_status == 'not_started' || data.running_process_status == 'in_progress')) {
      this.statusParams('verifying-data', 'Verifying...', 'far fa-sync-alt');
    } else if (data) {
      if (data[type] && data.is_fresh) {
        this.statusParams('verified-data', 'Verification', 'pi pi-check');
      } else if (data[type] && !data.is_fresh) {
        this.statusParams('outdated-data', 'Outdated', 'pi pi-clock');
      } else if (data.running_process_status === "completed" && !data[type]) {
        this.statusParams('no-data', 'No Data', 'pi pi-times');
      } else {
        this.statusParams('no-data', 'No Data', 'pi pi-times');
      }
    } else {
      this.statusParams('no-data', 'No Data', 'pi pi-times');
    }

    let param = {
      class_name: this.refreshStatus.class_name,
      process_status: this.refreshStatus.process_status,
      value: data ? data[type] : null,
      icon_class: this.refreshStatus.icon_class,
      last_updated: data ? this.formatVerifiedDate(data, type) : null
    }
    return param;
  }

  private statusParams(className: any, status: any, iconClass: any) {
    this.refreshStatus.class_name = className;
    this.refreshStatus.process_status = status;
    this.refreshStatus.icon_class = iconClass;
  }

  private formatVerifiedDate(data, type) {
    let verifiedDate = null;
    switch (type) {
      case 'email':
        verifiedDate = this.helperService.createUsLocalDate(data.email_last_updated);
        break;
      case 'corporate_phone':
        verifiedDate = this.helperService.createUsLocalDate(data.corporate_phone_last_updated);
        break;
      case 'direct_phone':
        verifiedDate = this.helperService.createUsLocalDate(data.direct_phone_last_updated);
        break;
      case 'mobile_number':
        verifiedDate = this.helperService.createUsLocalDate(data.mobile_number_last_updated);
        break;
      case 'personal_email':
        verifiedDate = this.helperService.createUsLocalDate(data.personal_email_last_update);
        break;
      default:
        verifiedDate = null;
        break
    }
    return verifiedDate;
  }

  /**
 * Returns the lists of contacts upon the provided search term;
 * @param searchText 
 * @returns {Observable<any>}
 */
  getCompaniesByTerm(searchText: string): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.companySearch}?&page_no=0&q=${searchText}&is_current=true`);
  }

  /**
   * Returns detailed contact profile
   * @param contactId
   * @returns {Observable<any>}
   */
  getCompanyProfile(companyId: string): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.companies}/${companyId}`);
  }

  /**
   * contactAdvanceSearch
   * @param payload 
   * @returns  Array of Contacts
   */
  contactAdvanceSearch(payload: any) {
    payload.start_index = 0;
    payload.size = 25;
    return this.requestService.post(`${ApiUrl.baseBackendUrl}/${ApiUrl.contacts}/${ApiUrl.advanceSearch}`, payload);
  }

  /**
   * Gets Company Names Lists
   * @returns Array of Company Names
   */
  getCompanyNameList(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.companies}/${ApiUrl.defaultList}?is_current=true`);
  }

  /**
   * Gets the Job-functions
   * @returns Array of Job-functions
   */
  getJobFunctions(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.contactSearch}/${ApiUrl.infoDepartments}`);
  }

  /**
   * Gets the Seniorities
   * @returns Array of Seniorities.
   */
  getSeniorities(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.contactSearch}/${ApiUrl.infoSeniorities}`);
  }

  /**
   * Gets the Skills
   * @returns Array of Skills ( Here Keywords are used as skills )
   */
  getSkillsKeyword(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.contactSearch}/${ApiUrl.keywords}`)
      .pipe(map((response: any) => {
        return this.helperService.buildNameAndIdObject(response.keywords);
      })
      );
  }

  /**
   * Get Default locations
   * @returns Default locations
   */
  getCompanyLocations(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.locations}/${ApiUrl.default_locations}`)
      .pipe(map((response: any) => {
        return this.helperService.addNameKey(response.locations, 'location_area');
      })
      );
  }

  /**
   * Get Default Industries
   * @returns 
   */
  getIndustries(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.companies}/${ApiUrl.industries}?&mapped=false`)
      .pipe(map((response: any) => {
        return this.helperService.buildNameAndIdObject(response.industries, false);
      })
      );
  }

  /**
   * Gets the technologies
   * @returns technologies
   */
  getTechnologies(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.companies}/${ApiUrl.technologies}`)
      .pipe(map((response: any) => {
        return this.helperService.buildNameAndIdObject(response.technologies);
      })
      );
  }

  /**
   * Company Advance search
   * @param payload 
   * @returns Array of companies
   */
  companyAdvanceSearch(payload: any) {
    payload.start_index = 0;
    payload.size = 25;
    return this.requestService.post(`${ApiUrl.baseBackendUrl}/${ApiUrl.companies}/${ApiUrl.advanceSearch}`, payload);
  }

  /**
   * Search contacts from TP name search
   * @param searchText 
   * @returns Array of Contacts
   */
  getFromTpNameSearch(searchText: string): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.contactTpNameSearch}?q=${searchText}`);
  }

  /**
   * Create place holder for given contact profile
   * @param payload 
   * @returns Ds contact profile Id
   */
  getContactPlaceholder(payload: any): Observable<any> {
    return this.requestService.post(`${ApiUrl.baseBackendUrl}/${ApiUrl.contacts}/${ApiUrl.createPlaceholderContact}`, payload).pipe(
      switchMap((response: any) => {
        if (response && response.contact_id) {
          return this.getContactProfile(response.contact_id);
        } else {
          return null;
        }
      })
    );
  }
}
