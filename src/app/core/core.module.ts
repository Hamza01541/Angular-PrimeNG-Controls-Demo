import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { JwtInterceptor } from '@app/core/interceptors';
import { lookupsReducer } from '@app/shared/stores/lookup/lookup.reducer';
import { LookupEffects } from '@app/shared/stores/lookup/lookup.effects';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { onBoardingReducer } from '@app/modules/onboarding/store/onboarding.reducer';
import { OnBoardingEffects } from '@app/modules/onboarding/store/onboarding.effects';
import { SearchEffects } from '@app/modules/search/store/search.effects';
import { searchReducer } from '@app/modules/search/store/search.reducer';
import { SubscriptionPlanEffects } from '@app/shared/stores/subscription-plans/subscription-plans.effects';
import { subscriptionPlanReducer } from '@app/shared/stores/subscription-plans/subscription-plans.reducer';
import { DashBoardEffects } from '@app/modules/dashboard/store/dashboard.effects';
import { dashBoardReducer } from '@app/modules/dashboard/store/dashboard.reducer';
import { personaReducer } from '@app/shared/stores/persona/persona.reducer';
import { PersonaEffects } from '@app/shared/stores/persona/persona.effects';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    StoreModule.forRoot({
      lookup: lookupsReducer,
      onboarding: onBoardingReducer, 
      search: searchReducer,
      persona: personaReducer,
      subscribePlan: subscriptionPlanReducer,
      dashboard: dashBoardReducer
    }, //  {metaReducers}),
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
          strictActionTypeUniqueness: true
        }
      }
    ),
    EffectsModule.forRoot([
      LookupEffects,
      OnBoardingEffects,
      SearchEffects,
      PersonaEffects,
      SubscriptionPlanEffects,
      DashBoardEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode
    }),
  ],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class CoreModule { }
