import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';
import {
  LoginComponent,
  SingupComponent,
  ForgotPasswordComponent,
  EmailConfirmationComponent,
  VerifyEmailConfirmationComponent,
  TermNConditionComponent
} from '@app/pages';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingupComponent,
    ForgotPasswordComponent,
    EmailConfirmationComponent,
    VerifyEmailConfirmationComponent,
    TermNConditionComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
