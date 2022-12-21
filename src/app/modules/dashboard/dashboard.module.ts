import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from '@app/modules/dashboard/dashboard-routing.module';
import { DashboardComponent } from '@app/modules/dashboard/pages';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from "@angular/cdk/drag-drop";
import {
  ConfirmationModalComponent,
  AddWidgetModalComponent,
  IntrodutionVideoModalComponent,
  SearchAndVerifyComponent,
  BuildVerifiedListComponent,
  SavedSearchCriteriaComponent,
  RecentContactsAndAccountsComponent,
  RecentSearchCriteriaComponent,
  RecentlyVerifiedContactsAndAccountListComponent,
  AddUsecaseCardComponent,
  UsecaseWidgetCardComponent,
  CriteriaWidgetCardComponent,

} from '@app/modules/dashboard/components';

@NgModule({
  declarations: [
    DashboardComponent,
    ConfirmationModalComponent,
    AddWidgetModalComponent,
    AddUsecaseCardComponent,
    UsecaseWidgetCardComponent,
    CriteriaWidgetCardComponent,
    IntrodutionVideoModalComponent,
    SearchAndVerifyComponent,
    RecentContactsAndAccountsComponent,
    RecentSearchCriteriaComponent,
    SavedSearchCriteriaComponent,
    BuildVerifiedListComponent,
    RecentlyVerifiedContactsAndAccountListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DashboardRoutingModule,
    DragDropModule,

  ]
})
export class DashboardModule { }
