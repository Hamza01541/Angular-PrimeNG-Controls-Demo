import { User } from '@app/shared/models';
import { createAction, props } from '@ngrx/store';

// Login User
export const changeLoaderState = createAction(
  '[Lookup] Loader state change',
  props<{ isLoading: boolean }>()
);

// Login User
export const loginUser = createAction(
  '[Lookup] Login User',
  props<{ user: User }>()
);

// Login User Successful
export const loginSuccess = createAction(
  '[Lookup] Login User Successfully',
  props<{ api_key: string }>()
);

// Login User Failure
export const loginFail = createAction(
  '[Lookup] Login User Fail',
  props<{ error: any }>()
);

// signUp User
export const signUpUser = createAction(
  '[Lookup] signUp User',
  props<{ user: User }>()
);

// signUp User Successful
export const signUpSuccess = createAction(
  '[Lookup] signUp User Successfully',
  props<{ api_key: string, email:string }>()
);

// signUp User Failure
export const signUpFail = createAction(
  '[Lookup] signUp User Fail',
  props<{ error: any }>()
);

// forgot password action
export const forgotPassword = createAction(
  '[Lookup] forgotPassword',
  props<{ email: string }>()
);

// forgotPassword Successful
export const forgotPasswordSuccess = createAction(
  '[Lookup] forgotPassword Successfully',
  props<{ token: string }>()
);

// forgotPassword User Failure
export const forgotPasswordFail = createAction(
  '[Lookup] forgotPassword Fail',
  props<{ error: any }>()
);

// confirmation password action
export const verifyEmail = createAction(
  '[Lookup] verifyEmail',
  props<{ email: string }>()
);

// verifyEmail Successful
export const verifyEmailSuccess = createAction(
  '[Lookup] verifyEmail Successfully',
  props<{ token: string }>()
);

// verifyEmail Failure
export const verifyEmailFail = createAction(
  '[Lookup] verifyEmail Fail',
  props<{ error: string }>()
);
// verification password action
export const verifyEmailToken = createAction(
  '[Lookup] verifyEmailToken',
  props<{ token: any }>()
);

// verificationPassword Successful
export const verifyEmailTokenSuccess = createAction(
  '[Lookup] verifyEmailToken Successfully',
  props<{ token: string }>()
);

// verifyEmailToken User Failure
export const verifyEmailTokenFail = createAction(
  '[Lookup] verifyEmailToken Fail',
  props<{ error: any }>()
);

// Creates action for handling Logout Request /
export const Logout = createAction("[Lookup] Logout user");

// Creates action for handling Logout Request /
export const LogoutSuccess = createAction("[Lookup] Logout Success");

// Creates action for handling Logout Request /
export const LogoutFail = createAction(
  "[Lookup] Logout Failed",
  props<{ error: any }>()
);

// Get User Detail.
export const GetUserDetail = createAction(
  '[Lookup] GetUserDetail',
);

// GetUserDetail Successful
export const GetUserDetailSuccess = createAction(
  '[Lookup] GetUserDetailSuccess',
  props<{ currentUserDetail: any }>()
);

// GetUserDetail Failure
export const GetUserDetailFail = createAction(
  '[Lookup] GetUserDetailFail',
  props<{ error: any }>()
);
