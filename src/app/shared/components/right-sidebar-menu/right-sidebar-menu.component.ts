import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-right-sidebar-menu',
  templateUrl: './right-sidebar-menu.component.html',
  styleUrls: ['./right-sidebar-menu.component.scss']
})
export class RightSidebarMenuComponent implements OnInit {
  @Input() isShowMenu: boolean;
  @Input() cardContent: any;
  @Input() isShowRightSideBar: any;
  @Output() closedSideBar = new EventEmitter();
  title: any;
  sidebar: boolean = true;

  constructor() {

  }

  ngOnInit(): void {
  }


  /**
   * close Right SideBar
   */
  closeRightSideBar() {
    this.isShowRightSideBar = false;
    this.closedSideBar.emit(this.isShowRightSideBar);
  }
}
