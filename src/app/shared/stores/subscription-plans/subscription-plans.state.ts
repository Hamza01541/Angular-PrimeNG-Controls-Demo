import { SubscriptionPlan } from '@app/shared/models';

export interface ISubscriptionPlanState {
  annualPrice: SubscriptionPlan[];
}

/** Initial state for SubscriptionPlan store. */
export const initialSubscriptionPlanState: ISubscriptionPlanState = {
  annualPrice: []
};
