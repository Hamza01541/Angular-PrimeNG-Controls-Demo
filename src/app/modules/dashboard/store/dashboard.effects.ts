import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import * as dashBoardAction from '@app/modules/dashboard/store/dashboard.actions';
import { of } from "rxjs";
import { LoaderService } from "@app/core/services/loader.service";
import { DashboardService } from "@app/core/services/dashboard/dashboard.service";
import {
  ApplicationUseCases, Tab, UseCasesWidget
} from "@app/shared/models";

@Injectable()
export class DashBoardEffects {
  constructor(
    private actions$: Actions,
    private loaderService: LoaderService,
    private dashboardService: DashboardService
  ) { }

  /**
   * Gets Tab list
   * Triggers when getQuestion action is dispatched
   * On success, dispatches getQuestionListSuccess action with jwt token
   */
  getTab$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.loadTabList),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.getTabList().pipe(map((res: Tab[]) => {
        this.loaderService.hideLoader();
        return dashBoardAction.getTabListSuccess({ tabList: res });
      }),
        catchError((error) => {
          this.loaderService.hideLoader();
          return of(dashBoardAction.getTabListFail({ error }));
        })
      );
    })
  )
  );

  /**
   * Post Tab
   * Triggers when postTabProcess action is dispatched
   * On success, dispatches postTabProcessSuccess action with jwt token
   */
  getPostTab$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.postTabProcess),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.postTabList(action.tab).pipe(map((tab: Tab) => {
        this.loaderService.hideLoader();
        return dashBoardAction.postTabSuccess({ tab });
      }),
        catchError((error) => {
          return of(dashBoardAction.postTabFail({ error }));
        })
      );
    })
  )
  );

  /**
   * update Tab Progress
   * Triggers when updateTabProcess action is dispatched
   * On success, dispatches updateTabProcessSuccess action with jwt token
   */
  getUpdateTab$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.updateTabProcess),
    mergeMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.updateTabList(action.tab).pipe(map((res) => {
        this.loaderService.hideLoader();
        return dashBoardAction.updateTabSuccess({ tabLis: res });
      }),
        catchError((error) => {
          return of(dashBoardAction.updateTabFail({ error }));
        })
      );
    })
  )
  );

  /**
   * delete Tab Process
   * Triggers when deleteTabProcess action is dispatched
   * On success, dispatches deleteSuccess action with jwt token
   */
  getDeleteTab$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.deleteTabProcess),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.deleteTabList(action.id).pipe(map((res) => {
        this.loaderService.hideLoader();
        return dashBoardAction.deleteTabSuccess();
      }),
        catchError((error) => {
          return of(dashBoardAction.deleteTabFail({ error }));
        })
      );
    })
  )
  );

  /**
   * Load ApplicationUseCaseList
   * Triggers when LoadApplicationUseCaseList action is dispatched
   * On success, dispatches LoadApplicationUseCaseListSuccess action with jwt token
   */
  LoadApplicationUseCaseList$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.LoadApplicationUseCaseList),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.getAppUseCaseList().pipe(map((res: ApplicationUseCases[]) => {
        this.loaderService.hideLoader();
        return dashBoardAction.LoadApplicationUseCaseListSuccess({ appUseCasesList: res });
      }),
        catchError((error) => {
          this.loaderService.hideLoader();
          return of(dashBoardAction.LoadApplicationUseCaseListFail({ error }));
        })
      );
    })
  )
  );

  /**
   * Load TabUseCaseWidgetList
   * Triggers when Load TabUseCaseWidgetList action is dispatched
   * On success, dispatches Load TabUseCaseWidgetListSuccess action with jwt token
   */
  LoadTabUseCaseWidgetList$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.LoadTabUseCaseWidgetList),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.getTabUseCaseWidgetList(action.tabId).pipe(map((res: UseCasesWidget[]) => {
        this.loaderService.hideLoader();
        return dashBoardAction.LoadTabUseCaseWidgetListSuccess({ tabWidgetList: res });
      }),
        catchError((error) => {
          this.loaderService.hideLoader();
          return of(dashBoardAction.LoadTabUseCaseWidgetListFail({ error }));
        })
      );
    })
  )
  );

  /**
    * Post Card Tab
    * Triggers when postCardProcess action is dispatched
    * On success, dispatches postCardSuccess action with jwt token
    */
  getPostCard$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.postCardProcess),
    switchMap((action) => {
      // this.loaderService.showLoader();
      return this.dashboardService.postCardList(action.newAddedCard).pipe(map((res) => {
        // this.loaderService.hideLoader();
        return dashBoardAction.postCardSuccess({ card: res });
      }),
        catchError((error) => {
          return of(dashBoardAction.postCardFail({ error }));
        })
      );
    })
  )
  );

  /**
   * update Card
   * Triggers when updateCardProcess action is dispatched
   * On success, dispatches updateQuestionSuccess action with jwt token
   */
  getUpdateCard$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.updateCardProcess),
    switchMap((action) => {
      // this.loaderService.showLoader();
      return this.dashboardService.updateCardList(action.id).pipe(map((res) => {
        // this.loaderService.hideLoader();
        return dashBoardAction.updateCardSuccess();
      }),
        catchError((error) => {
          return of(dashBoardAction.updateCardFail({ error }));
        })
      );
    })
  )
  );

  /**
   * delete Card Process
   * Triggers when deleteCardProcess action is dispatched
   * On success, dispatches deleteCardSuccess action with jwt token
   */
  getDeleteCard$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.deleteCardProcess),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.deleteCardList(action.id).pipe(map((res) => {
        this.loaderService.hideLoader();
        return dashBoardAction.deleteCardSuccess();
      }),
        catchError((error) => {
          return of(dashBoardAction.deleteCardFail({ error }));
        })
      );
    })
  )
  );

  /**
  * LoadRecentContacts
  * Triggers when LoadRecentContacts action is dispatched
  * On success, dispatches LoadRecentContactsSuccess action with
  */
  LoadRecentContacts$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.LoadRecentContacts),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.getRecentContacts().pipe(map((res: any[]) => {
        this.loaderService.hideLoader();
        return dashBoardAction.LoadRecentContactsSuccess({ recentContacts: res });
      }),
        catchError((error) => {
          return of(dashBoardAction.LoadRecentContactsFail({ error }));
        })
      );
    })
  )
  );

  /**
 * LoadRecentAccounts
 * Triggers when LoadRecentAccounts action is dispatched
 * On success, dispatches LoadRecentAccountsSuccess action with
 */
  LoadRecentAccounts$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.LoadRecentAccounts),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.getRecentAccounts().pipe(map((res: any) => {
        this.loaderService.hideLoader();
        return dashBoardAction.LoadRecentAccountsSuccess({ recentAccounts: res.companies });
      }),
        catchError((error) => {
          return of(dashBoardAction.LoadRecentAccountsFail({ error }));
        })
      );
    })
  )
  );

  /**
 * LoadRecentlySearchedAccounts
 * Triggers when LoadRecentlySearchedAccounts action is dispatched
 * On success, dispatches LoadRecentlySearchedAccountsSuccess action with
 */
  LoadRecentlySearchedAccounts$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.LoadRecentlySearchedAccounts),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.getRecentlySearchedAccounts().pipe(map((res: any[]) => {
        this.loaderService.hideLoader();
        return dashBoardAction.LoadRecentlySearchedAccountsSuccess({ recentSearchAccounts: res });
      }),
        catchError((error) => {
          return of(dashBoardAction.LoadRecentlySearchedAccountsFail({ error }));
        })
      );
    })
  )
  );

  /**
 * LoadRecentlySearchedContacts
 * Triggers when LoadRecentlySearchedContacts action is dispatched
 * On success, dispatches LoadRecentlySearchedAccountsSuccess action with
 */
  LoadRecentlySearchedContacts$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.LoadRecentlySearchedContacts),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.getRecentlySearchedContacts().pipe(map((res: any[]) => {
        this.loaderService.hideLoader();
        return dashBoardAction.LoadRecentlySearchedContactsSuccess({ recentSearchContacts: res });
      }),
        catchError((error) => {
          return of(dashBoardAction.LoadRecentlySearchedContactsFail({ error }));
        })
      );
    })
  )
  );

  /**
 * LoadRecentlyViewdContacts
 * Triggers when LoadRecentlyViewedContacts action is dispatched
 * On success, dispatches LoadRecentlyViewedContactsSuccess action with
 */
   LoadRecentlyViewedContacts$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.LoadRecentlyViewedContacts),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.getRecentlyViewedContacts().pipe(map((res: any[]) => {
        this.loaderService.hideLoader();
        return dashBoardAction.LoadRecentlyViewedContactsSuccess({recentViewedContacts:res});
      }),
        catchError((error) => {
          return of(dashBoardAction.LoadRecentlyViewedContactsFail({ error }));
        })
      );
    })
  )
  );

  /**
 * LoadRecentlyViewedAccounts
 * Triggers when LoadRecentlyViewedContacts action is dispatched
 * On success, dispatches LoadRecentlyViewedAccountsSuccess action with
 */
   LoadRecentlyViewedAccounts$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.LoadRecentlyViewedAccounts),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.getRecentlyViewedAccounts().pipe(map((res: any[]) => {
        this.loaderService.hideLoader();
        return dashBoardAction.LoadRecentlyViewedAccountsSuccess({recentViewedAccounts:res});
      }),
        catchError((error) => {
          return of(dashBoardAction.LoadRecentlyViewedAccountsFail({ error }));
        })
      );
    })
  )
  );

  /**
 * LoadRecentlyVerifiedContacts
 * Triggers when LoadRecentlyViewedContacts action is dispatched
 * On success, dispatches LoadRecentlyVerifiedContactsSuccess action with
 */
   LoadRecentlyVerifiedContacts$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.LoadRecentlyVerifiedContacts),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.getRecentlyVerifiedContacts().pipe(map((res: any[]) => {
        this.loaderService.hideLoader();
        return dashBoardAction.LoadRecentlyVerifiedContactsSuccess({recentVerifiedContacts:res});
      }),
        catchError((error) => {
          return of(dashBoardAction.LoadRecentlyViewedContactsFail({ error }));
        })
      );
    })
  )
  );

  /**
 * LoadRecentlyVerifiedAccounts
 * Triggers when LoadRecentlyViewedContacts action is dispatched
 * On success, dispatches LoadRecentlyVerifiedAccountssSuccess action with
 */
   LoadRecentlyVerifiedAccounts$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.LoadRecentlyVerifiedAccounts),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.getRecentlyVerifiedAccounts().pipe(map((res: any[]) => {
        this.loaderService.hideLoader();
        return dashBoardAction.LoadRecentlyVerifiedAccountsSuccess({recentVerifiedAccounts:res});
      }),
        catchError((error) => {
          return of(dashBoardAction.LoadRecentlyViewedAccountsFail({ error }));
        })
      );
    })
  )
  );

  /**
 * LoadSavedSeacrhCriteriaAccounts
 * Triggers when LoadSavedSeacrhCriteriaAccounts action is dispatched
 * On success, dispatches LoadSavedSeacrhCriteriaAccountssSuccess action with
 */
   LoadSavedSeacrhCriteriaAccounts$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.LoadSavedSeacrhCriteriaAccounts),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.getSavedSearchCriteriaAccounts().pipe(map((res: any) => {
        this.loaderService.hideLoader();
        return dashBoardAction.LoadSavedSeacrhCriteriaAccountsSuccess({savedSearchCriteriaAccount:res.account_segments});
      }),
        catchError((error) => {
          return of(dashBoardAction.LoadSavedSeacrhCriteriaAccountsFail({ error }));
        })
      );
    })
  )
  );

  /**
 * LoadAllSavedSeacrhes
 * Triggers when LoadAllSavedSeacrhes action is dispatched
 * On success, dispatches LoadAllSavedSeacrheSuccess action with
 */
   LoadAllSavedSeacrhes$ = createEffect(() => this.actions$.pipe(ofType(dashBoardAction.LoadAllSavedSeacrhes),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.dashboardService.getAllSavedSearches().pipe(map((res: any) => {
        this.loaderService.hideLoader();
        return dashBoardAction.LoadAllSavedSeacrhesSuccess({allSavedSearches:res});
      }),
        catchError((error) => {
          return of(dashBoardAction.LoadAllSavedSeacrhesFail({ error }));
        })
      );
    })
  )
  );
}


