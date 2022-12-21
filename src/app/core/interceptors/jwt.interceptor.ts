import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { catchError } from 'rxjs/operators';
import { headerBlackListUrls } from '@app/shared/constants/black-list-urls/black-list-urls.constant';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private storageService: LocalStorageService) { }

  /**
   * Request Interceptor
   * Appends api key in request
   * @param request
   * @param next
   * @returns
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const api_key_token = this.storageService.get('api_key');
    const api_key_token = request.url.includes('account') || request.url.includes('contact') ? "4jPZJfSQqeYhjhjggEc6RQss" : this.storageService.get('api_key');
    if (!this.isHeaderRequired(request) || this.checkingUrlForEmailVerification(request)) {
      return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }));
    } else {
      this.setApiKey(request, api_key_token);
      const newRequest = request.clone();
      return next.handle(newRequest).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              // Todo
            }
          }
          return throwError(err);
        })
      )
    }
  }

  /**
   * sets Api Key in request urls
   * @param request
   * @param api_key_token
   * @returns
   */
  setApiKey(request: any, api_key_token: any) {
    const prefix = request.url.includes('?') ? '&' : '?';
    request.url = `${request.url}${prefix}api_key=${api_key_token}`;
    return request;
  }

  /**
   * Checks either request headers are required for current request or not.
   * @param request: HttpRequest<any> request API request to be made
   * @returns boolean
   */
  private isHeaderRequired(request: HttpRequest<any>): boolean {
    return (!headerBlackListUrls.includes(request.url));
  }

  /**
  * Checks either request headers are required for current request or not.
  * @param request: HttpRequest<any> request API request to be made
  * @returns boolean
  */
  private checkingUrlForEmailVerification(request: HttpRequest<any>) {
    return request.url.includes('?email') || request.url.includes('?token');
  }
}
