import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { AppRoutes } from '@app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private storageService: LocalStorageService
  ) { }

  canActivate() {
    const apiKey = this.storageService.get('api_key');
    if (apiKey && apiKey.length) {
      return true;
    } else {
      this.router.navigate([AppRoutes.login]);
      return false;
    }
  }
}
