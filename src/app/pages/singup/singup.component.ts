import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@app/environments/environment';
import { AppRoutes } from '@app/shared/constants';
import { User } from '@app/shared/models';
import { ILookupState, signUpUser } from '@app/shared/stores';
import { Store } from '@ngrx/store';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { TermNConditionComponent } from '@app/pages';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
  appRoutes = AppRoutes;
  user: User = new User();
  isPasswordMatched = false;
  dialogRef: DynamicDialogRef | undefined;

  constructor(
    private store: Store<ILookupState>,
    public dialogService: DialogService,
    private router: Router) { }

  ngOnInit(): void {}

  /**
   * Signups user and redirects to email confirmation page.
   */
  signUp(){
    if(this.isPasswordMatched && this.user.isConsentChecked){
      this.store.dispatch(signUpUser({ user: this.user }));
    }
  }

  /**
   * Selects and unselects terms and policies
   */
  toggleConsent(){
  this.user.isConsentChecked =! this.user.isConsentChecked;
  }

  /**
   * Opens consent form
   */
  openConsentForm(): void{
    this.dialogRef = this.dialogService.open(TermNConditionComponent, {
      header: 'Terms and Privacy Policies',
      width: '50%',
      contentStyle: {"padding": "0", "overflow": "hidden"},
    });

    this.dialogRef.onClose.subscribe((isConsentChecked) => {
      this.user.isConsentChecked = isConsentChecked;
    });
  }

  /**
   * Checks if password and confirmation password matches
   */
  validatePassword(){
    this.isPasswordMatched = this.user.password === this.user.password_confirmation ? true: false;
  }

  /**
   * Use Oath2 to login with google
   */
  loginWithGoogle(){
    window.open("https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20https://mail.google.com%20https://www.googleapis.com/auth/calendar%20https://www.googleapis.com/auth/plus.profile.emails.read%20https://www.googleapis.com/auth/plus.login%20https://www.google.com/m8/feeds&redirect_uri=" + environment.googleRedirectUri + '&state=+google' + "&response_type=code&client_id=" + environment.googleClientId, "_self");
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
}
