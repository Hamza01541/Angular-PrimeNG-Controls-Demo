import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import * as subcriptionAction from '@app/shared/stores/subscription-plans/subscription-plans.actions';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { LoaderService } from '@app/core/services/loader.service';
import { SubcriptionPlansService } from '@app/core/services/subscription-plans/subcription-plans.service';
import { SubscriptionPlan } from '@app/shared/models';

@Injectable()
export class SubscriptionPlanEffects {
  constructor(
    private actions$: Actions,
    private subcriptionPlansService: SubcriptionPlansService,
    private router: Router,
    private messageService: MessageService,
    private storageService: LocalStorageService,
    private loaderService: LoaderService
  ) { }

  /**
   * LoadAnnualPricingTiers
   * Triggers when LoadAnnualPricingTiers action is dispatched
   * On success, dispatches LoadAnnualPricingTiersSuccess action with annualPrice array
   * @subcriptionPlans Display loaders
   */
  loadAnnualPricingTiers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(subcriptionAction.LoadAnnualPricingTiers),
      switchMap((action) => {
        this.loaderService.showLoader();
        return this.subcriptionPlansService.getAnnualPricingList().pipe(
          map((res: SubscriptionPlan[]) => {
            this.loaderService.hideLoader();
            return subcriptionAction.LoadAnnualPricingTiersSuccess({ annualPrice: res });
          }),
          catchError((error) => {
            this.loaderService.hideLoader();

            return of(subcriptionAction.LoadAnnualPricingTiersFail({ error }));
          })
        );
      })
    )
  );
}
