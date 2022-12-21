import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '@app/shared/constants';
import { AuthGuard } from '@app/core/services/auth-guard/auth.guard';
import {
  LoginComponent,
  SingupComponent,
  EmailConfirmationComponent,
  VerifyEmailConfirmationComponent,
  ForgotPasswordComponent
} from '@app/pages';

import {
  OnBoardingModule,
  DashboardModule
} from '@app/modules';
import { SearchModule } from '@app/modules/search/search.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.login,
    pathMatch: 'full'
  },
  {
    path: AppRoutes.login,
    component: LoginComponent
  },
  {
    path: AppRoutes.signup,
    component: SingupComponent
  },
  {
    path: AppRoutes.forgotPassword,
    component: ForgotPasswordComponent
  },
  {
    path: AppRoutes.emailConfirmation,
    component: EmailConfirmationComponent,
    canActivate:[AuthGuard]
  },
  {
    path: AppRoutes.verifyEmail,
    component: VerifyEmailConfirmationComponent,
    canActivate:[AuthGuard]
  },
  {
    path: AppRoutes.onBoarding,
    canActivate:[AuthGuard],
    loadChildren: () => OnBoardingModule
  },
  {
    path: AppRoutes.dashboard,
    canActivate:[AuthGuard],
    loadChildren: () => DashboardModule
  },
  {
    path: AppRoutes.search,
    loadChildren: () => SearchModule,
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    redirectTo: AppRoutes.login
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
