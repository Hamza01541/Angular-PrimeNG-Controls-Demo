import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import * as onBoardingAction from '@app/modules/onboarding/store/onboarding.actions';
import { of } from "rxjs";
import { OnBoardingService } from "@app/core/services/onboarding/onboarding.service";
import { LoaderService } from "@app/core/services/loader.service";

@Injectable()
export class OnBoardingEffects {
  constructor(
    private actions$: Actions,
    private onBoardingService: OnBoardingService,
    private loaderService: LoaderService
  
  ) { }

  /**
   * Gets already submitted Question list
   * Triggers when getQuestion action is dispatched
   * On success, dispatches getQuestionListSuccess action with jwt token
   */
     getQuestions$ = createEffect(() => this.actions$.pipe(ofType(onBoardingAction.getQuestionList),
     switchMap((action) => {
      this.loaderService.showLoader();
       return this.onBoardingService.getQuestionList(action.userId).pipe(map((res,) => {
        this.loaderService.hideLoader();
         return onBoardingAction.getQuestionListSuccess({ questionList: res });
       }),
         catchError((error) => {
          this.loaderService.hideLoader();
           return of(onBoardingAction.getQuestionListFail({ error }));
         })
       );
     })
   )
   );

 /**
   * Post Questions Progress
   * Triggers when submitQuestionProcess action is dispatched
   * On success, dispatches submitQuestionProcessSuccess action with jwt token
   */
  getSubmitQuestion$ = createEffect(() => this.actions$.pipe(ofType(onBoardingAction.submitQuestionProcess),
  switchMap((action) => {
    return this.onBoardingService.postQuestionProgcess(action.question).pipe(map((res,) => {
      return onBoardingAction.submitQuestionProcessSuccess({ token:res });
    }),
      catchError((error) => {
        return of(onBoardingAction.submitQuestionProcessFail({ error }));
      })
    );
  })
)
);
  
 /**
   * Save Questions Progress
   * Triggers when saveQuestion action is dispatched
   * On success, dispatches onBoardingSuccess action with jwt token
   */
  getOnSaveQuestion$ = createEffect(() => this.actions$.pipe(ofType(onBoardingAction.saveQuestionProgress),
    switchMap((action) => {
      return this.onBoardingService.saveQuestionProgcess(action.question).pipe(map((res) => {
        return onBoardingAction.saveQuestionProgressSuccess({ token: res.api_key });
      }),
        catchError((error) => {
          return of(onBoardingAction.saveQuestionProgressFail({ error }));
        })
      );
    })
  )
  );

   /**
   * update Questions Progress
   * Triggers when updateUserProgress action is dispatched
   * On success, dispatches updateQuestionSuccess action with jwt token
   */
    getOnUpdateQuestion$ = createEffect(() => this.actions$.pipe(ofType(onBoardingAction.updateUserProgress),
    switchMap((action) => {
      return this.onBoardingService.updateUserProgress(action.progress).pipe(map((res) => {
        return onBoardingAction.updateUserProgressSuccess({ token: res.api_key });
      }),
        catchError((error) => {
          return of(onBoardingAction.updateUserProgressFail({ error }));
        })
      );
    })
  )
  );
  
  /**
   * Credit
   * Triggers when Credit action is dispatched
   * On success, dispatches onBoardingSuccess action with jwt token
   */
  getCredit$ = createEffect(() => this.actions$.pipe(ofType(onBoardingAction.creditProgress),
  switchMap((action) => {
    return this.onBoardingService.onBoardingCredit(action.credits).pipe(map((res,) => {
      return onBoardingAction.creditProgressSuccess({ token:res });
    }),
      catchError((error) => {
        return of(onBoardingAction.creditProgressFail({ error }));
      })
    );
  })
)
);
}