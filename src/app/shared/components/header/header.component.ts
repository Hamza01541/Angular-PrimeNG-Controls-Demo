import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuestionState } from '@app/modules/onboarding/store/onboarding.state';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubscriptionPlansComponent } from '@app/shared/components';
import { DialogService } from 'primeng/dynamicdialog';
import { ILookupState, Logout } from '@app/shared/stores';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { HelperService } from '@app/core/services';
import { ShepherdService } from 'angular-shepherd';
import { steps as defaultSteps, defaultStepOptions} from '@app/shared/models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isShowHeader: boolean;
  @Input() currentPageUrl: string;
  @Input() currentUserDetail: any;

  credits: number = 150
  title: any;
  logoutItem: any

  dashBoardUserProfile: MenuItem[] = [{
    items: [
      // {
      //   label: 'Settings',
      // },
      // {
      //   label: 'Change Password',
      // },
      {
        label: 'Logout',
        command: () => {
          this.logoutUser();
        }
      },
    ]
  }
  ];

  dialogRef: DynamicDialogRef | undefined;

  constructor(private router: Router, private headerStore: Store<IQuestionState>,
    private lookUpStore: Store<ILookupState>,
    public dialogService: DialogService,
    private helperService: HelperService,
    private shepherdService: ShepherdService

  ) { }

  ngOnInit(): void { }

  /**
   * open subscription Model
   */
  openSubscriptionModel(): void {
    this.dialogRef = this.dialogService.open(SubscriptionPlansComponent, {
      header: 'DealSignal yearly premier B2B lead genration',
      width: '80%',
      contentStyle: { "padding": "0", "overflow": "hidden" },
      closeOnEscape: true
    });

    this.dialogRef.onClose.subscribe((data) => {
    });
  }


  /**
  * logout user
  */
  logoutUser() {
    this.lookUpStore.dispatch(Logout());
  }

  /**
   * Returns the upper case of initial. Makes dealsignal As Dealsignal.
   * @param textValue 
   * @returns String
   */
  upCaseInitial(textValue: string) {
    return this.helperService.upperCaseInitial(textValue);
  }

  /** 
   * shpered modal
   */
  openshperedModal(){
    this.shepherdService.defaultStepOptions = defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.addSteps(defaultSteps);
    this.shepherdService.start();
  }

}
