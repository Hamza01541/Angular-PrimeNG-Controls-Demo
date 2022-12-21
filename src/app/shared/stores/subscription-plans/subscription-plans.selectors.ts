import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ISubscriptionPlanState } from "@app/shared/stores/subscription-plans/subscription-plans.state";

export const subscriptionPlanFeatureSelector = createFeatureSelector<ISubscriptionPlanState>('subscribePlan')
export const subscriptionPlanSelector = createSelector(subscriptionPlanFeatureSelector,(state) => state.annualPrice)
