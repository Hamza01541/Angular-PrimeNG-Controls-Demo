import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@app/environments/environment';
import { AppRoutes } from '@app/shared/constants';
import { User } from '@app/shared/models';
import { ILookupState, loginUser } from '@app/shared/stores';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  appRoutes = AppRoutes;

  constructor(private store: Store<ILookupState>, private router: Router) { }

  ngOnInit(): void { }

  /**
   * Logs in user
   * @returns {void}
   */
  login(): void {
    const userData = {
      email: this.user.email,
      password: this.user.password
    };

    this.store.dispatch(loginUser({ user: userData }));
  }

  /**
   * Redirects user to givven route
   * @param {string} route Route on which user should be redirected
   */
  redirectTo(route: string) {
    this.router.navigate([route]);
  }

  /**
   * Use Oath2 to login with google
   */
  loginWithGoogle() {
    window.open("https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20https://mail.google.com%20https://www.googleapis.com/auth/calendar%20https://www.googleapis.com/auth/plus.profile.emails.read%20https://www.googleapis.com/auth/plus.login%20https://www.google.com/m8/feeds&redirect_uri=" + environment.googleRedirectUri + '&state=+google' + "&response_type=code&client_id=" + environment.googleClientId, "_self");
  }
}
