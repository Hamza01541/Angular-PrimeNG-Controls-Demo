import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from '@app/modules/search/search-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { SearchPageComponent, 
  FiltersComponent, 
  ResultSectionComponent, 
  SearchResultPageComponent, 
  ContactFiltersComponent,
  CompanyFiltersComponent,
  SearchByNameComponent } from '@app/modules/search/pages';
import { RecentActivityGridComponent } from './pages/search-page/component/result-section/recent-activity-grid/recent-activity-grid.component';
import { SavedCriteriaGridComponent } from './pages/search-page/component/result-section/saved-criteria-grid/saved-criteria-grid.component';
@NgModule({
  declarations: [
    SearchPageComponent,
    FiltersComponent,
    SearchByNameComponent,
    SearchResultPageComponent,
    ResultSectionComponent,
    ContactFiltersComponent,
    CompanyFiltersComponent,
    RecentActivityGridComponent,
    SavedCriteriaGridComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class SearchModule { }
