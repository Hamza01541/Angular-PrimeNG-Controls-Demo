import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/services/request.service';
import { LocalStorageService } from '@app/core/services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private requestService: RequestService, private storageService: LocalStorageService) { }

}
