import { createReducer, on, Action } from '@ngrx/store';

import * as onBoardingAction from '@app/modules/onboarding/store/onboarding.actions';
import { 
    initialQuestionState, 
    IQuestionState } from '@app/modules/onboarding/store/onboarding.state';

const createOnBoardingReducer = createReducer(initialQuestionState,

  //Get QuestionList reducers
  on(onBoardingAction.getQuestionList, (state, ) => ({
    ...state,
  })),

  on(onBoardingAction.getQuestionListSuccess, (state, { questionList }) => ({
    ...state,
    questionList,

  })),

  on(onBoardingAction.getQuestionListFail, (state, { error }) => ({
    ...state,
    error,
  })),

  //Save Questions Progress reducers
  on(onBoardingAction.saveQuestionProgress, (state) => ({
    ...state,
  })),

  on(onBoardingAction.saveQuestionProgressSuccess, (state, { token }) => ({
    ...state,
    token,
  })),
  on(onBoardingAction.saveQuestionProgressFail, (state, { error }) => ({
    ...state,
    error,
  })),
  
  //Update Questions Progress reducers
  on(onBoardingAction.updateUserProgress, (state) => ({
    ...state,
  })),

  on(onBoardingAction.updateUserProgressSuccess, (state, { token }) => ({
    ...state,
    token,
  })),
  on(onBoardingAction.updateUserProgressFail, (state, { error }) => ({
    ...state,
    error,
  })),


  //Credits Question  reducers
  on(onBoardingAction.creditProgress, (state) => ({
    ...state,
  })),

  on(onBoardingAction.creditProgressSuccess, (state, { token }) => ({
    ...state,
    token,
  })),
  on(onBoardingAction.creditProgressFail, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function onBoardingReducer(state: IQuestionState = initialQuestionState, action: Action) {
  return createOnBoardingReducer(state, action);
}
