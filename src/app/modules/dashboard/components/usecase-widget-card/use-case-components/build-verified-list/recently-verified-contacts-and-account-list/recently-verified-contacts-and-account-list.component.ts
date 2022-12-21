import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from '@app/core/services';

@Component({
  selector: 'app-recently-verified-contacts-and-account-list',
  templateUrl: './recently-verified-contacts-and-account-list.component.html',
  styleUrls: ['./recently-verified-contacts-and-account-list.component.scss']
})
export class RecentlyVerifiedContactsAndAccountListComponent implements OnInit {

  @Input() recentVerifiedContacts:any[];
  @Input() recentVerifiedAccounts:any[];

  constructor(public helperService: HelperService) {}

  /**
  * get status icon image
  * @param status
  * @returns
  */
  getStatusIconImage(status) {
    let image = ''
    if (status.includes('Verified')) {
      image = "assets/icons/verified-check.svg";
    } else if (status.includes('Verifying')) {
      image = "assets/icons/verify-loading.svg";
    }
    return image;
  }

  ngOnInit(): void {}
}
