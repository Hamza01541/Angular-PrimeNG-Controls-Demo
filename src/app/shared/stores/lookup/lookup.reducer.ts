import { createReducer, on, Action } from '@ngrx/store';
import {
  ILookupState,
  initialLookupState,
} from '@app/shared/stores/lookup/lookup.state';
import * as looksUpAction from '@app/shared/stores/lookup/lookup.actions';

const createLookupsReducer = createReducer(initialLookupState,
  on(looksUpAction.changeLoaderState, (state, { isLoading }) => ({
    ...state,
    isLoading
  })),

  on(looksUpAction.loginUser, (state) => ({
    ...state,
  })),

  on(looksUpAction.loginSuccess, (state, { api_key }) => ({
    ...state,
    api_key,
  }))
  ,

  on(looksUpAction.signUpSuccess, (state, { api_key, email }) => ({
    ...state,
    api_key,
    email,
  })),

  on(looksUpAction.GetUserDetail, (state) => ({
    ...state,
  })),

  on(looksUpAction.GetUserDetailSuccess, (state, { currentUserDetail }) => ({
    ...state,
    currentUserDetail,
  }))
  ,

  on(looksUpAction.GetUserDetailFail, (state, { error }) => ({
    ...state,
    error
  })),
);

export function lookupsReducer(state: ILookupState = initialLookupState, action: Action) {
  return createLookupsReducer(state, action);
}
