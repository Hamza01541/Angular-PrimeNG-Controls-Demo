import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnBoardingComponent } from '@app/modules/onboarding/pages';

const routes: Routes = [
     {
        path: '',
        component: OnBoardingComponent
      }
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnBoardingRoutingModule {
}
