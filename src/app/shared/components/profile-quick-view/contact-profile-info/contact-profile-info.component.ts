import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from '@app/core/services';
import { Contact } from '@app/shared/models';

@Component({
  selector: 'contact-profile-info',
  templateUrl: './contact-profile-info.component.html',
  styleUrls: ['./contact-profile-info.component.scss']
})
export class ContactProfileInfoComponent implements OnInit {
  @Input() contact: Contact;
  @Input() profileStatus: any;
  constructor(private helperService: HelperService) { }

  ngOnInit(): void {
  }

  /**
   * Navigates to specified url in new browser tab.
   * @param url 
   */
  goToLink(url: string) {
    this.helperService.visitLink(url);
  }
}
