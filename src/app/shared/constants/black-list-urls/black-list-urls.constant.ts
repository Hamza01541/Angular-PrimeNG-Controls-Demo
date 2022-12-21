import { ApiUrl } from "@app/shared/constants";

/**
 * API request urls that do not require api_key in request headers.
 */
export const headerBlackListUrls: string[] = [
  `${ApiUrl.baseBackendUrl}/${ApiUrl.auth}/${ApiUrl.signIn}`,
  `${ApiUrl.baseBackendUrl}/${ApiUrl.auth}/${ApiUrl.forgotPassword}`,
  `${ApiUrl.baseBackendUrl}/${ApiUrl.auth}/${ApiUrl.signUp}`,
  `${ApiUrl.baseBackendUrl}/${ApiUrl.usersEmailVerification}?email=`,
  `${ApiUrl.baseBackendUrl}/${ApiUrl.usersVerifyEmailVerificationToken}`,
  `${ApiUrl.baseBackendUrl}/${ApiUrl.usersEmailVerification}`,
];
