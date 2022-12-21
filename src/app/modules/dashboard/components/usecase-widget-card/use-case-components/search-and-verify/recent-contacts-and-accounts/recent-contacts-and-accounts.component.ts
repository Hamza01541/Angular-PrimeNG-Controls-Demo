import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperService } from '@app/core/services';

@Component({
  selector: 'app-recent-contacts-and-accounts',
  templateUrl: './recent-contacts-and-accounts.component.html',
  styleUrls: ['./recent-contacts-and-accounts.component.scss']
})
export class RecentContactsAndAccountsComponent implements OnInit {
  @Input() recentContacts: any[];
  @Input() recentAccounts: any[];
  @Input() items: any[];

  @Output() showContactSideBar = new EventEmitter();
  @Output() showAccountSideBar = new EventEmitter();

  status: any;
  constructor(public helperService: HelperService) { }

  ngOnInit(): void {}

  /**
   * open contact sidebar
   * @param contact
   */
  openContactSideBar(contact) {
    this.showContactSideBar.emit(contact)
  }

  /**
   * open account sidebar
   * @param account
   */
  openAccountSideBar(account) {
    this.showAccountSideBar.emit(account)
  }
}
