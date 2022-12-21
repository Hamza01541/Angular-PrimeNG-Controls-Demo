import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '@app/shared/constants';
import { ILookupState, verifyEmailToken } from '@app/shared/stores';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-verify-email-confirmation',
  templateUrl: './verify-email-confirmation.component.html',
  styleUrls: ['./verify-email-confirmation.component.scss']
})
export class VerifyEmailConfirmationComponent implements OnInit {

  token: string;

  constructor(private store: Store<ILookupState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params.token;
      this.verifyEmailToken(this.token);
    });
  }

  /**
   * Verifies email verficiation token
   * @param token
   */
  verifyEmailToken(token: string) {
    this.store.dispatch(verifyEmailToken({ token: token }))
  }

  /**
   *redirect to onboarding page
   */
  redirectToOnBoarding() {
    this.router.navigate([AppRoutes.onBoarding]);
  }
}
