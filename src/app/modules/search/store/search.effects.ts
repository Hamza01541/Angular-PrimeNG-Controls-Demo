import { Injectable } from "@angular/core";
import { LoaderService } from "@app/core/services/loader.service";
import { SearchingService } from "@app/core/services/searching/searching.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as searchAction from '@app/modules/search/store/search.actions';
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { ContactSearchByNameResponse } from "@app/shared/models/contacts/contact-search/contact-search-by-name.model";
import { CompanySearchByNameResponse } from "@app/shared/models/company/company-search-by-name.model";

@Injectable()
export class SearchEffects {
  contactSearchByNameResp: ContactSearchByNameResponse
  companySearchByNameResp: CompanySearchByNameResponse
  constructor(
    private actions$: Actions,
    private searchService: SearchingService,
    private loaderService: LoaderService
  ) {
    this.contactSearchByNameResp = new ContactSearchByNameResponse;
    this.companySearchByNameResp = new CompanySearchByNameResponse;
  }

  /**
   * For Getting contact Lists on name search.
   */
  getContacts$ = createEffect(() => this.actions$.pipe(ofType(searchAction.getContactList),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.searchService.getContactsByTerm(action.searchText).pipe(map((res) => {
        this.loaderService.hideLoader();
        return searchAction.getContactListSuccess({ contactSearchByNameResp: { contacts: res.contacts, total: res.total } });
      }),
        catchError((error) => {
          this.loaderService.hideLoader();
          return of(searchAction.getContactListFail({ error }));
        })
      );
    })
  )
  );

  /**
   * For Getting Contact profile.
   */
  getContact$ = createEffect(() => this.actions$.pipe(ofType(searchAction.getContact),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.searchService.getContactProfile(action.contactId).pipe(map((res) => {
        this.loaderService.hideLoader();
        return searchAction.getContactSuccess({ contact: res.contact });
      }),
        catchError((error) => {
          this.loaderService.hideLoader();
          return of(searchAction.getContactFail({ error }));
        })
      );
    })
  )
  );

  /**
   * For Clearing contact lists from store.
   */
  clearContacts$ = createEffect(() => this.actions$.pipe(ofType(searchAction.clearContactLists),
    map(() => {
      return searchAction.getContactListSuccess({ contactSearchByNameResp: this.contactSearchByNameResp });
    })
  ));

  /**
   * For Getting company Lists on name search.
   */
  getCompanies$ = createEffect(() => this.actions$.pipe(ofType(searchAction.getCompanyList),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.searchService.getCompaniesByTerm(action.searchText).pipe(map((res) => {
        this.loaderService.hideLoader();
        return searchAction.getCompanyListSuccess({ companySearchByNameResp: { companies: res, total: res.length } });
      }),
        catchError((error) => {
          this.loaderService.hideLoader();
          return of(searchAction.getCompanyListFail({ error }));
        })
      );
    })
  )
  );

  /**
   * For Getting Company profile.
   */
  getCompany = createEffect(() => this.actions$.pipe(ofType(searchAction.getCompany),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.searchService.getCompanyProfile(action.companyId).pipe(map((res) => {
        this.loaderService.hideLoader();
        return searchAction.getCompanySuccess({ company: res });
      }),
        catchError((error) => {
          this.loaderService.hideLoader();
          return of(searchAction.getCompanyFail({ error }));
        })
      );
    })
  )
  );

  /**
   * For Clearing company lists from store.
   */
  clearCompanies$ = createEffect(() => this.actions$.pipe(ofType(searchAction.clearCompanyLists),
    map(() => {
      return searchAction.getCompanyListSuccess({ companySearchByNameResp: this.companySearchByNameResp });
    })
  ));


  clearContact$ = createEffect(() => this.actions$.pipe(ofType(searchAction.ClearQuickViewStore),
    map(() => {
      return searchAction.getContactSuccess({ contact: {} });
    })
  ));

  clearCompany$ = createEffect(() => this.actions$.pipe(ofType(searchAction.ClearQuickViewStore),
    map(() => {
      return searchAction.getCompanySuccess({ company: {} });
    })
  ));


  /**
   * For Getting contact Lists on Criteria Search.
   */
  getContactsByCriteria$ = createEffect(() => this.actions$.pipe(ofType(searchAction.onContactAdvanceSearch),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.searchService.contactAdvanceSearch(action.criteriaPayload).pipe(map((res) => {
        this.loaderService.hideLoader();
        return searchAction.onContactAdvanceSearchSuccess({ contactCriteriaSearchResult: res.contacts });
      }),
        catchError((error) => {
          this.loaderService.hideLoader();
          return of(searchAction.getContactListFail({ error }));
        })
      );
    })
  )
  );

  /**
    * For Getting Company Names Lists.
    */
  getCompaniesByName$ = createEffect(() => this.actions$.pipe(ofType(searchAction.fetchCompanyNameLists),
    switchMap((action) => {
      return this.searchService.getCompanyNameList().pipe(map((res) => {
        return searchAction.fetchCompanyNameListsSuccess({ companyNameList: res });
      })
      );
    })
  )
  );

  /**
   * Fetch Job functions from  API.
   */
  getJobFunctions$ = createEffect(() => this.actions$.pipe(ofType(searchAction.fetchJobFunctions),
    switchMap((action) => {
      return this.searchService.getJobFunctions().pipe(map((res) => {
        return searchAction.fetchJobFunctionsSuccess({ jobFunctions: res });
      })
      );
    })
  )
  );

  /**
   * Fetch Seniorities from  API.
   */
  getSeniorities$ = createEffect(() => this.actions$.pipe(ofType(searchAction.fetchSeniorities),
    switchMap((action) => {
      return this.searchService.getSeniorities().pipe(map((res) => {
        return searchAction.fetchSenioritiesSuccess({ seniorities: res });
      })
      );
    })
  )
  );

  /**
   * Fetch Skills(keyword) from  API.
   */
  getSkills$ = createEffect(() => this.actions$.pipe(ofType(searchAction.fetchSkills),
    switchMap((action) => {
      return this.searchService.getSkillsKeyword().pipe(map((response) => {
        return searchAction.fetchSkillsSuccess({ skills: response });
      })
      );
    })
  )
  );

  /**
   * Fetch Locations from  API.
   */
  getLocations$ = createEffect(() => this.actions$.pipe(ofType(searchAction.fetchCompanyLocations),
    switchMap((action) => {
      return this.searchService.getCompanyLocations().pipe(map((response) => {
        return searchAction.fetchCompanyLocationsSuccess({ locations: response });
      })
      );
    })
  )
  );

  /**
   * Fetch Industries from  API.
   */
  getIndustries$ = createEffect(() => this.actions$.pipe(ofType(searchAction.fetchIndustries),
    switchMap((action) => {
      return this.searchService.getIndustries().pipe(map((response) => {
        return searchAction.fetchIndustriesSuccess({ industries: response });
      })
      );
    })
  )
  );

  /**
  * Fetch Technologies from  API.
  */
  getTechnologies$ = createEffect(() => this.actions$.pipe(ofType(searchAction.fetchTechnologies),
    switchMap((action) => {
      return this.searchService.getTechnologies().pipe(map((response) => {
        return searchAction.fetchTechnologiesSuccess({ technologies: response });
      })
      );
    })
  )
  );

  /**
   * For Getting company Lists on Criteria Search.
   */
  getCompaniesByCriteria$ = createEffect(() => this.actions$.pipe(ofType(searchAction.companyAdvanceSearch),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.searchService.companyAdvanceSearch(action.criteriaPayload).pipe(map((res) => {
        this.loaderService.hideLoader();
        return searchAction.companyAdvanceSearchSuccess({ companyCriteriaSearchResult: res.companies });
      }),
        catchError((error) => {
          this.loaderService.hideLoader();
          return of(error);
        })
      );
    })
  )
  );

  /**
   * For Getting search result from TP Search
   */
  getContactTpSearch$ = createEffect(() => this.actions$.pipe(ofType(searchAction.getContactTpSearchList),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.searchService.getFromTpNameSearch(action.searchText).pipe(map((res) => {
        this.loaderService.hideLoader();
        return searchAction.getContactTpSearchListSuccess({ contactTpSearchByNameResp: { data: res.data, total: res.total } });
      }),
        catchError((error) => {
          this.loaderService.hideLoader();
          return of(searchAction.getContactTpSearchError({ contactTpSearchError: error }));
        })
      );
    })
  )
  );

  /**
   * Get Contact placeholder on the basis PDL profile data.
   */
  getContactPlaceHolder$ = createEffect(() => this.actions$.pipe(ofType(searchAction.getContactPlaceHolder),
    switchMap((action) => {
      this.loaderService.showLoader();
      return this.searchService.getContactPlaceholder(action.payload).pipe(map((res) => {
        this.loaderService.hideLoader();
        return searchAction.getContactSuccess({ contact: res.contact });
      }),
        catchError((error) => {
          this.loaderService.hideLoader();
          return of(error);
        })
      );
    })
  )
  );
}
