import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from '@app/core/services';
import { Company } from '@app/shared/models';

@Component({
  selector: 'company-profile-info',
  templateUrl: './company-profile-info.component.html',
  styleUrls: ['./company-profile-info.component.scss']
})
export class CompanyProfileInfoComponent implements OnInit {
  @Input() company: Company;

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
