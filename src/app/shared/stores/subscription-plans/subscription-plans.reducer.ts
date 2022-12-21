import { createReducer, on, Action } from '@ngrx/store';
import {
  ISubscriptionPlanState,
  initialSubscriptionPlanState,
} from '@app/shared/stores/subscription-plans/subscription-plans.state';
import * as subcriptionAction from '@app/shared/stores/subscription-plans/subscription-plans.actions';

const createSubscriptionPlanReducer = createReducer(initialSubscriptionPlanState,
  on(subcriptionAction.LoadAnnualPricingTiers, (state) => ({
    ...state,
  })),

  on(subcriptionAction.LoadAnnualPricingTiersSuccess, (state, { annualPrice }) => ({
    ...state,
    annualPrice,
  }))
  ,

  on(subcriptionAction.LoadAnnualPricingTiersFail, (state, { error }) => ({
    ...state,
      error
  }))
);

export function subscriptionPlanReducer(state: ISubscriptionPlanState = initialSubscriptionPlanState, action: Action) {
  return createSubscriptionPlanReducer(state, action);
}
