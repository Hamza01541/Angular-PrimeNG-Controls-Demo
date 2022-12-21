import { ActivatedRoute, Router } from '@angular/router';
import { Component,OnInit } from '@angular/core';
import { verifyEmail, ILookupState } from '@app/shared/stores';
import { Store } from '@ngrx/store';
import { AppRoutes } from '@app/shared/constants';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
  appRoutes = AppRoutes;
  email: string;

  constructor(
    private store: Store<ILookupState>,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params.email;
    });
  }

  /**
   * Verifies user's email
   */
  verifyEmail() {
    this.store.dispatch(verifyEmail({ email: this.email }))
  }

  /**
   * Skips email verification and redirects user to on boarding module
   */
  skipConfirmatation() {
    this.router.navigate([AppRoutes.onBoarding]);
  }

  /**
   * Redirects user to givven route
   * @param {string} route Route on which user should be redirected
   */
  redirectTo(route: string) {
    this.router.navigate([route]);
  }
}
