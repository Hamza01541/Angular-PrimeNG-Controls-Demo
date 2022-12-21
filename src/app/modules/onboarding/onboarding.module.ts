import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule }    from '@angular/forms';
import { OnBoardingComponent } from '@app/modules/onboarding/pages';
import { OnBoardingRoutingModule } from '@app/modules/onboarding/onboarding-routing.module';

@NgModule({
  declarations: [OnBoardingComponent],
  imports: [CommonModule, FormsModule, SharedModule, OnBoardingRoutingModule],
})
export class OnBoardingModule {}
