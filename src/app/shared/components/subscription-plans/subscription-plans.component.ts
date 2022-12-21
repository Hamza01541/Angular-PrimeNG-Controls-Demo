import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { LoadAnnualPricingTiers } from '@app/shared/stores/subscription-plans/subscription-plans.actions';
import { subscriptionPlanSelector } from '@app/shared/stores/subscription-plans/subscription-plans.selectors';
import { ISubscriptionPlanState } from '@app/shared/stores/subscription-plans/subscription-plans.state';
import { select, Store } from '@ngrx/store';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss']
})
export class SubscriptionPlansComponent implements OnInit {
  displayModal: boolean;
  annualPricing: any;
  currentUserData: any
  activePlan = 'Basic'

  constructor(
    private subscriptionPlanStore: Store<ISubscriptionPlanState>,
    public dialogRef: DynamicDialogRef,
    private storageService: LocalStorageService

  ) { }

  ngOnInit(): void {
    this.loadSubscriptionPlan();
    this.getSubscriptionPlan()
    this.getcurrentUserData()
  }


  /**
   * load Subscription plan
   */
  loadSubscriptionPlan() {
    this.subscriptionPlanStore.dispatch(LoadAnnualPricingTiers());
  }



  /**
   * Get Subscription plan
  */
  getSubscriptionPlan() {
    this.subscriptionPlanStore.pipe(select(subscriptionPlanSelector)).subscribe((tier: any) => {
      if (tier && tier.length) {
        this.annualPricing = tier;
      }
    });
  }


  getcurrentUserData() {
    this.currentUserData = this.storageService.get('currentUserDetail')
  }

  /**
   * 
   * @param plan Subscribe current plan
   */
  subscribeCurrentPlan(plan: any){

  }
}
