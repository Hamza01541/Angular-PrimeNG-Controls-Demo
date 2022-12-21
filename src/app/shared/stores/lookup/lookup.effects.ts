import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication/authentication.service';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import * as looksUpAction from '@app/shared/stores/lookup/lookup.actions';
import { Router } from '@angular/router';
import { AppRoutes } from '@app/shared/constants';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { LoaderService } from '@app/core/services/loader.service';


@Injectable()
export class LookupEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private router: Router,
    private messageService: MessageService,
    private storageService: LocalStorageService,
    private loaderService: LoaderService
  ) { }

  /**
   * Logins user
   * Triggers when loginUser action is dispatched
   * On success, dispatches LoginSuccess action with jwt token
   * @todo Display loaders
   */
  getLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(looksUpAction.loginUser),
      switchMap((action) => {
        this.loaderService.showLoader();
        return this.authenticationService.login(action.user).pipe(
          map((res) => {
            this.loaderService.hideLoader();
            this.messageService.add({
              severity: 'success',
              summary: 'Login',
              detail: 'User Login Successfully',
            });
            return looksUpAction.loginSuccess({ api_key: res.api_key });
          }),
          catchError((error) => {
            this.loaderService.hideLoader();
            this.messageService.add({
              severity: 'error',
              summary: 'Login Error',
              detail: 'Invalid email or password',
            });
            return of(looksUpAction.loginFail({ error }));
          })
        );
      })
    )
  );

  /**
   * Sets authentication token to storage, and gets user detail.
   * Checks user's current progress and redirect user to dashboard or onboarding module accordingly
   * Triggers when login success action is dispatched
   */
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(looksUpAction.loginSuccess),
        tap((res) => {
          this.storageService.set('api_key', res.api_key);
          this.loaderService.showLoader();
          this.authenticationService.getUserDetail().subscribe((userDetail) => {
            this.storageService.set("currentUserDetail",userDetail);
            this.loaderService.hideLoader();

            if (userDetail.onboarding_progression.onboarding_completed) {
              this.router.navigate([AppRoutes.dashboard]);
            } else {
              let queryParams = {};
              const currentProgress = userDetail.onboarding_progression.onboarding_progress;

              if (currentProgress && currentProgress.completed_steps && currentProgress.completed_steps.length
                && currentProgress.completed_steps[currentProgress.completed_steps.length - 1]) {
                queryParams = {
                  identifier: currentProgress.completed_steps[currentProgress.completed_steps.length - 1].identifier,
                  userId: userDetail.current_subscription_data.user_id,
                }
              }

              this.router.navigate([AppRoutes.onBoarding], { queryParams: queryParams });
            }
          }), error => {
            this.loaderService.hideLoader();
          }
        })
      ),
    { dispatch: false }
  );

  /**
   * Sign up user
   * Triggers when signUpUser action is dispatched
   * On success, dispatches LoginSuccess action with jwt token
   */
  getSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(looksUpAction.signUpUser),
      switchMap((action) => {
        this.loaderService.showLoader();
        return this.authenticationService.signUp(action.user).pipe(
          map((res) => {
            this.loaderService.hideLoader();

            this.messageService.add({
              severity: 'success',
              summary: 'Register',
              detail: 'SignUp Successfully',
            });
            this.storageService.set('api_key', res.api_key);
            return looksUpAction.signUpSuccess({
              api_key: res.api_key,
              email: action.user.email,
            });
          }),
          catchError((error) => {
            this.loaderService.hideLoader();
            this.messageService.add({
              severity: 'error',
              summary: 'SingUp Error',
              detail: 'Email has already been taken',
            });
            return of(looksUpAction.signUpFail({ error }));
          })
        );
      })
    )
  );

  /**
   * Sign ups user
   * Triggers when signUpUser action is dispatched
   * On success, redirect on email verification component
   */
  getSignUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(looksUpAction.signUpSuccess),
        tap((res) => {
          this.loaderService.showLoader();
          this.authenticationService.getUserDetail().subscribe(userDetail => {
            this.loaderService.hideLoader();
            this.storageService.set('user_id', userDetail.current_subscription_data.id);
            this.router.navigate([AppRoutes.emailConfirmation], {
              queryParams: { email: res.email },
            });
          }),error=>{
            this.loaderService.hideLoader();
          };
        })
      ),
    { dispatch: false }
  );

  /**
   * forgot password
   * Triggers when forgotPassword action is dispatched
   * On success, dispatches forgotPasswordSuccess action with jwt token
   */
  getForgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(looksUpAction.forgotPassword),
      switchMap((action) => {
        this.loaderService.showLoader();
        return this.authenticationService.forgotPassword(action.email).pipe(
          map((res) => {
            this.loaderService.hideLoader();
            this.messageService.add({
              severity: 'success',
              summary: 'Forget Password',
              detail:
                'New password is sent on your email, Please check your email',
            });
            return looksUpAction.forgotPasswordSuccess({ token: res.token });
          }),
          catchError((error) => {
            this.loaderService.hideLoader();
            this.messageService.add({
              severity: 'error',
              summary: 'Forget Email Error',
              detail: 'User does not exists with given email',
            });
            return of(looksUpAction.forgotPasswordFail({ error }));
          })
        );
      })
    )
  );
  /**
   * verify Email
   * Triggers when verifyEmail action is dispatched
   * On success, dispatches verifyEmailSuccess action with jwt token
   */
  getVerifyEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(looksUpAction.verifyEmail),
      switchMap((action) => {
        this.loaderService.showLoader();
        return this.authenticationService.verifyEmail(action.email).pipe(
          map((res) => {
            this.loaderService.hideLoader();
            return looksUpAction.verifyEmailSuccess({ token: res.token });
          }),
          catchError((error) => {
            this.loaderService.hideLoader();
            this.messageService.add({
              severity: 'error',
              summary: error,
              detail: error,
            });
            return of(looksUpAction.verifyEmailFail({ error }));
          })
        );
      })
    )
  );

  /**
   * Sign ups user
   * Triggers when signUpUser action is dispatched
   * On success, dispatches verifyEmailTokenSuccess action with jwt token
   */
  verificationPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(looksUpAction.verifyEmailToken),
      switchMap((action) => {
        this.loaderService.showLoader();
        return this.authenticationService.verifyEmailToken(action.token).pipe(
          map((res) => {
            this.loaderService.hideLoader();
            return looksUpAction.verifyEmailTokenSuccess({ token: res.token });
          }),
          catchError((error) => {
            this.loaderService.hideLoader();
            this.messageService.add({
              severity: 'error',
              summary: error,
              detail: error,
            });
            return of(looksUpAction.verifyEmailTokenFail({ error }));
          })
        );
      })
    )
  );

  /**
   * Sign ups user
   * Triggers when signUpUser action is dispatched
   * On success, redirect on email verification component
   */
  vertificationPasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(looksUpAction.verifyEmailTokenSuccess),
        tap((res) =>
          this.router.navigate([AppRoutes.verifyEmail], {
            queryParams: { token: res.token },
          })
        )
      ),
    { dispatch: false }
  );



  /**
   * Logout user.
   * Triggers when LogoutUser action is dispatched.
   * On success, dispatch LogoutSuccess action with token.
   * On error, triggers LogoutFail action.
   */
 getLogout$ = createEffect(() =>
 this.actions$.pipe(
   ofType(looksUpAction.Logout),
   switchMap((action) => {
     this.loaderService.showLoader();
     return this.authenticationService.logout().pipe(
       map((res) => {
         this.loaderService.hideLoader();
         this.router.navigate([`${AppRoutes.login}`]);
         return looksUpAction.LogoutSuccess();
       }),
       catchError((error) => {
         this.loaderService.hideLoader();

         return of(looksUpAction.LogoutFail({ error }));
       })
     );
   })
 )
);

  /**
   * Get UserDetail.
   * Triggers when GetUserDetail action is dispatched.
   * On success, dispatch GetUserDetailSuccess action with token.
   * On error, triggers GetUserDetailFail action.
   */
   GetUserDetail$ = createEffect(() =>
   this.actions$.pipe(
   ofType(looksUpAction.GetUserDetail),
   switchMap((action) => {
     this.loaderService.showLoader();
     return this.authenticationService.getUserDetail().pipe(
       map((res) => {
         this.loaderService.hideLoader();
         return looksUpAction.GetUserDetailSuccess({currentUserDetail: res});
       }),
       catchError((error) => {
         this.loaderService.hideLoader();

         return of(looksUpAction.GetUserDetailFail({ error }));
       })
     );
   })
 )
);



}



