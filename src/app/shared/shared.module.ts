import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from '@app/shared/modules';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ListboxModule } from 'primeng/listbox';
import { AccordionModule } from 'primeng/accordion';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SliderModule } from 'primeng/slider';

import {
  BackGroundComponent,
  SidebarMenuComponent,
  LoaderComponent,
  HeaderComponent,
  CircularProgressComponent,
  SubscriptionPlansComponent,
  RightSidebarMenuComponent,
  QuickStartSidemenuComponent,
  ProfileQuickViewComponent,
  ContactProfileInfoComponent,
  CompanyProfileInfoComponent,
  SavedPersonaSearchesListComponent,
  SelectOptionListComponent,
  GridComponent,
  SearchSiderbarMenuComponent
} from '@app/shared/components';

/** Shared Modules */
const SHARED_MODULES = [
  CommonModule,
  FormsModule,
  PrimengModule,
  TableModule,
  SidebarModule,
  ListboxModule,
  AccordionModule,
  InputSwitchModule,
  SliderModule
];

/** Shared Components */
const SHARED_COMPONENTS = [
  BackGroundComponent,
  SidebarMenuComponent,
  QuickStartSidemenuComponent,
  LoaderComponent,
  HeaderComponent,
  CircularProgressComponent,
  SubscriptionPlansComponent,
  RightSidebarMenuComponent,
  ProfileQuickViewComponent,
  ContactProfileInfoComponent,
  CompanyProfileInfoComponent,
  SavedPersonaSearchesListComponent,
  SelectOptionListComponent,
  GridComponent,
  SearchSiderbarMenuComponent
];

@NgModule({
  imports: [...SHARED_MODULES,
  NgCircleProgressModule.forRoot({
    backgroundStrokeWidth: 0,
    percent: 50,
    showBackground: false,
    radius: 50,
    responsive: false,
    maxPercent: 100,
    outerStrokeWidth: 10,
    innerStrokeWidth: 10,
    outerStrokeColor: "#6FCF97",
    innerStrokeColor: "#EEF1F6",
    animateTitle: true,
    animationDuration: 500,
    showTitle: true,
    showUnits: false,
    clockwise: true,
    startFromZero: false,
    showSubtitle: false,
    lazy: false,
    titleColor: "#6FCF97"
  })
  ],
  exports: [...SHARED_MODULES, ...SHARED_COMPONENTS],
  declarations: [...SHARED_COMPONENTS],
  entryComponents: [],
  providers: []
})
export class SharedModule { }
