import { SubscriptionPlan } from '@app/shared/models';
import { createAction, props } from '@ngrx/store';

// LoadAnnualPricingTiers
export const LoadAnnualPricingTiers = createAction(
  '[AnnualPricing] AnnualPricing',
);

// LoadAnnualPricingTiers Successful
export const LoadAnnualPricingTiersSuccess = createAction(
  '[AnnualPricing] AnnualPricing Successfully',
  props<{ annualPrice: SubscriptionPlan[] }>()
);

// LoadAnnualPricingTiers  Failure
export const LoadAnnualPricingTiersFail = createAction(
  '[AnnualPricing] AnnualPricing Fail',
  props<{ error: any }>()
);

