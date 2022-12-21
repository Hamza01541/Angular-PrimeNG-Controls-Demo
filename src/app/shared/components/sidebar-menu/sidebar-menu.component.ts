import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppRoutes } from '@app/shared/constants';
import { SideBarItem } from '@app/shared/models';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  @Input() isShowNavBar: boolean;
  @Input() isSideNavBarToggled: boolean;
  @Input() currentPageUrl: string;
  @Output() onToggleSideBar = new EventEmitter();

  sideBarItems: SideBarItem[] = [];
  sideBarSettingItems: SideBarItem[] = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initializeSideBar();
  }

  initializeSideBar() {
    this.sideBarItems = [
      {
        displayName: 'DashBoard',
        icon: 'dashboard',
        route: AppRoutes.dashboard
      },
      {
        displayName: 'Search',
        icon: 'search',
        route: AppRoutes.search
      },
      /** @Todo will use later */
      // {
      //   displayName: 'Audience',
      //   icon: 'audience',
      //   route: ''
      // },
      // {
      //   displayName: 'Intent',
      //   icon: 'intent',
      //   route: ''
      // },
      // {
      //   displayName: 'Discover',
      //   icon: 'discover',
      //   route: ''
      // },
      // {
      //   displayName: 'Enrich',
      //   icon: 'enrich',
      //   route: ''
      // },
      // {
      //   displayName: 'Connect',
      //   icon: 'connect',
      //   route: ''
      // },
      // {
      //   displayName: 'Refresh',
      //   icon: 'refresh',
      //   route: ''
      // }
    ];

    this.sideBarSettingItems = [
      {
        displayName: 'Video',
        icon: 'video',
        route: ''
      },
      {
        displayName: 'Help',
        icon: 'help',
        route: ''
      },
      {
        displayName: 'Setting',
        icon: 'setting',
        route: ''
      }
    ];
  }

  /**
   * Redirects user to selected menu item.
   * @param routes
   */
  redirectTo(selectedRoute: string) {
    if (selectedRoute.length) {
      this.router.navigate([selectedRoute]);
    }
  }

  /**
   * Gets image path from image name
   * @param imageName Image name
   * @returns
   */
  getImage(imageName: string) {
   return `assets/icons/${imageName}.svg`;
  }

  /**
   * Toggles side menu
   */
  sideBarShow() {
    this.onToggleSideBar.emit()
  }
}
