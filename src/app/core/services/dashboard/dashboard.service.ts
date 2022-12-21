import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/services/request.service';
import { ApiUrl } from '@app/shared/constants';
import { Tab, UseCasesWidget } from '@app/shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private requestService: RequestService) {}

  /**
   * Gets already submitted Question list
   * @param {string} Current LoggedIn user id
   * @returns {Observable<any>}
   */
  getTabList(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.dashboardTabs}`);
  }

  /**
   * post tab
   * @param {Tab} tab
   * @returns {Observable<any>}
   */
  postTabList(tab: Tab): Observable<any> {
    return this.requestService.post(`${ApiUrl.baseBackendUrl}/${ApiUrl.dashboardTabs}`, tab);
  }

  /**
   * Updates Tab
   * @param {id} tab
   * @returns {Observable<any>}
   */
  updateTabList(tab: Tab): Observable<any> {
    return this.requestService.put(`${ApiUrl.baseBackendUrl}/${ApiUrl.dashboardTabs}/${tab.id}`, tab);
  }

  /**
   * Delete Single Tab
   * @param {id} any
   * @returns {Observable<any>}
   */
  deleteTabList(id: number): Observable<any> {
    return this.requestService.delete(`${ApiUrl.baseBackendUrl}/${ApiUrl.dashboardTabs}/${id}`);
  }

  /**
 * Gets already submitted Question list
 * @param {string} Current LoggedIn user id
 * @returns {Observable<any>}
 */
  getAppUseCaseList(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.applicationUseCases}`);
  }

  /**
   * Gets already submitted Question list
   * @param {string} Current LoggedIn user id
   * @returns {Observable<any>}
   */
  getTabUseCaseWidgetList(tabId: number): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.dashboardTabs}/${tabId}/${ApiUrl.useCaseWidgets}`);
  }

  /**
   * post card
   * @param {Tab} tab
   * @returns {Observable<any>}
   */
  postCardList(newAddedCard: UseCasesWidget): Observable<any> {
    return this.requestService.post(`${ApiUrl.baseBackendUrl}/${ApiUrl.dashboardTabs}/${newAddedCard.dashboard_tab_id}/${ApiUrl.useCaseWidgets}`, newAddedCard);
  }

  /**
   * Updates Card
   * @param {id} tab
   * @returns {Observable<any>}
   */
  updateCardList(id: number): Observable<any> {
    return this.requestService.put(`${ApiUrl.baseBackendUrl}/${ApiUrl.dashboardTabs}/${id}/${ApiUrl.useCaseWidgets}/${id}`, {});
  }

  /**
   * Delete Single Card
   * @param {id} any
   * @returns {Observable<any>}
   */
  deleteCardList(id: any): Observable<any> {
    return this.requestService.delete(`${ApiUrl.baseBackendUrl}/${ApiUrl.dashboardTabs}/${id}/${ApiUrl.useCaseWidgets}/${id}`);
  }

  /**
  * Gets Recently Viewed Contacts
  * @returns {Observable<any>}
  */
  getRecentContacts(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.userEvents}/${ApiUrl.recentContactsEvents}`);
  }

  /**
  * Gets Recently Verified Contacts
  * @returns {Observable<any>}
  */
  getRecentAccounts(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.userEvents}/${ApiUrl.recentAaccountsEvents}`);
  }

  /**
  * Gets Recently Searched Contacts
  * @returns {Observable<any>}
  */
  getRecentlySearchedContacts(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.contactSearches}`);
  }

  /**
  * Gets Recently Searched Accounts
  * @returns {Observable<any>}
  */
  getRecentlySearchedAccounts(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.accountSearches}`);
  }

  /**
  * Gets Recently Viewed Accounts
  * @returns {Observable<any>}
  */
  getRecentlyViewedAccounts(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}${ApiUrl.viewAccounts}`);
  }

  /**
  * Gets Recently Viewed Contacts
  * @returns {Observable<any>}
  */
  getRecentlyViewedContacts(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}${ApiUrl.viewContacts}`);
  }

  /**
  * Gets Recently Verified Accounts
  * @returns {Observable<any>}
  */
  getRecentlyVerifiedAccounts(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.verifyAccounts}`);
  }

  /**
  * Gets Recently Verified Contacts
  * @returns {Observable<any>}
  */
  getRecentlyVerifiedContacts(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.verifyContacts}`);
  }

  /**
  * Gets Saved Search Criteria
  * @returns {Observable<any>}
  */
  getSavedSearchCriteriaAccounts(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.accountSegments}?criteria_only=true&size=10&start_index=0`);
  }

  /**
  * Gets All Saved Searches
  * @returns {Observable<any>}
  */
  getAllSavedSearches(): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.saved_searches}`);
  }
}
