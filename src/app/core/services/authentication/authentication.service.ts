import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiUrl } from '@app/shared/constants';
import { User } from '@app/shared/models';
import { RequestService } from '@app/core/services/request.service';
import { LocalStorageService } from '@app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private requestService: RequestService, private storageService: LocalStorageService) { }

  /**
   * Logins user
   * @param {User} user
   * @returns {Observable<User>}
   */
  login(user: User): Observable<any> {
    return this.requestService.post(`${ApiUrl.baseBackendUrl}/${ApiUrl.auth}/${ApiUrl.signIn}`, { user });
  }

  /**
   * Signups user
   * @param {User} user
   * @returns {Observable<User>}
   */
  signUp(user: User): Observable<any> {
    return this.requestService.post(`${ApiUrl.baseBackendUrl}/${ApiUrl.auth}/${ApiUrl.signUp}`, { user });
  }

  /**
   * Forgot Password
   * @param {User} user
   * @returns {Observable<User>}
   */
  forgotPassword(email: string): Observable<any> {
    return this.requestService.post(`${ApiUrl.baseBackendUrl}/${ApiUrl.auth}/${ApiUrl.forgotPassword}`, {email: email });
  }

  /**
   * Sends email verification token to user's email address
   * @param {string} email
   * @returns {Observable<any>}
   */
  verifyEmail(email: string): Observable<any> {
    return this.requestService.put(`${ApiUrl.baseBackendUrl}/${ApiUrl.usersEmailVerification}?email=${email}`, {});
  }

  /**
   * Verifies email verficiation token
   * @param {string} token Email verfication token.
   * @returns {Observable<any>}
   */
  verifyEmailToken(token: string): Observable<any> {
    return this.requestService.put(`${ApiUrl.baseBackendUrl}/${ApiUrl.usersVerifyEmailVerificationToken}?token=${token}`, {});
  }

  /**
   * Gets user's detail
   * @returns {Observable<any>}
   */
     getUserDetail(): Observable<any> {
      return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.userProfile}`);
    }


    /**
     * logout
     * @returns true
     */
    logout(){
      localStorage.clear();
      return of(true);
    }


}
