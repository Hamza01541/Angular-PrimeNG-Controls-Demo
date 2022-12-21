import { Injectable } from '@angular/core';
import { ApiUrl } from '@app/shared/constants';
import { Observable } from 'rxjs';
import { RequestService } from '@app/core/services/request.service';
import { LocalStorageService } from '@app/core/services/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class SubcriptionPlansService {

  constructor(private requestService: RequestService, private storageService: LocalStorageService) { }



    /**
   * Gets already Annual Pricing
   * @returns {Observable<any>}
   */
     getAnnualPricingList(): Observable<any> {
      return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.subscriptions}/${ApiUrl.annualPricingTiers}`);
    }

}
