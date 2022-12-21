import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/services/request.service';
import { ApiUrl } from '@app/shared/constants';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private requestService: RequestService, private storageService: LocalStorageService) { }

  /**
   * This method returns array of Persona of user
   * @param startIndex 
   * @returns List of Persona
   */
  getPersonaLists(startIndex: any = 0): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.persona}?size=20&start_index=${startIndex}`);
  }
}
