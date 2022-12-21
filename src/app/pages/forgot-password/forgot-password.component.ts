import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '@app/shared/constants';
import { User } from '@app/shared/models';
import { forgotPassword, ILookupState } from '@app/shared/stores';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  user: User = new User();

  constructor(private store: Store<ILookupState>, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Sends reset password request
   */
  resetPassword() {
    this.store.dispatch(forgotPassword({ email: this.user.email }));
    this.redirectToLogin();
  }

  /**
   * Redirects user to login page
   */
  redirectToLogin() {
    this.router.navigate([AppRoutes.login]);
  }
}
