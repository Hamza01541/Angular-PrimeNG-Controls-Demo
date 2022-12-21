import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppRoutes } from '@app/shared/constants';
import { GetUserDetail, getUserDetailSelector, ILookupState } from '@app/shared/stores';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentPageUrl: string = '';
  isHideNavBar: boolean = true;
  isSideNavBarToggled: boolean = false;
  isFilterBarToggled: boolean = true;
  blackListNavBar: string[] = [
    AppRoutes.login,
    AppRoutes.forgotPassword,
    AppRoutes.signup,
    AppRoutes.onBoarding,
    AppRoutes.emailConfirmation,
    AppRoutes.verifyEmail
  ]
  currentUserDetail: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private looksUpStore: Store<ILookupState>
    ) {

  }

  ngOnInit() {
    this.getCurrentPageUrl();
    this.getCurrentUserDetail();
  }

  /**
   * Gets current page url
   */
  getCurrentPageUrl() {
    this.currentPageUrl = this.router.url.replace('/', '').trim();
    this.isNavBarRequired(this.currentPageUrl);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPageUrl = this.router.url.replace('/', '').trim();
        this.isNavBarRequired(this.currentPageUrl);
      }
    });
  }

  /**
   * Checks either navbars are required on current route or not. If navbars are not required then hide them.
   * @param currentPageUrl
   */
  isNavBarRequired(currentPageUrl: string) {
    this.isHideNavBar = this.blackListNavBar.some(routeName => currentPageUrl.includes(routeName));
  }

  /**
   * on toggle sidebar
   */
  onToggleSideBar() {
    this.isSideNavBarToggled = !this.isSideNavBarToggled;
  }

  /**
   * on toggle filter
   */
  onToggleFilterBar() {
    this.isFilterBarToggled = !this.isFilterBarToggled;
  }
  
  /**
   * get currentUser Detail
   */
   getCurrentUserDetail(){
    this.looksUpStore.dispatch(GetUserDetail());
    this.looksUpStore.pipe(select(getUserDetailSelector)).subscribe((currentUserDetail: any) => {
      if (currentUserDetail) {
        this.currentUserDetail = currentUserDetail;
      }
    });
  }
}
