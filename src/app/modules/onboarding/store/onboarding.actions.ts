import { Credit } from '@app/shared/models';
import { onBoardingProgress, Question } from '@app/shared/models';
import { createAction, props } from "@ngrx/store";

// Get QuestionList
export const getQuestionList = createAction(
  '[getQuestionList] getQuestionList',
  props<{ userId: string }>()
);

// GetQuestionList Successful
export const getQuestionListSuccess = createAction(
  '[getQuestionList] getQuestionListSuccessfully',
  props<{ questionList: any[] }>()
);

// GetQuestionList Failure
export const getQuestionListFail = createAction(
  '[getQuestionList] getQuestionListFail',
  props<{ error: any }>()
);

// Post Question
export const submitQuestionProcess = createAction(
  '[submitQuestionProcess] submitQuestionProcess',
  props<{ question:Question }>()
);

// Post Question Successful
export const submitQuestionProcessSuccess = createAction(
  '[submitQuestionProcess] submitQuestionProcessSuccessfully',
  props<{ token:any }>()
);

// Post Question Failure
export const submitQuestionProcessFail = createAction(
  '[submitQuestionProcess] submitQuestionProcessFail',
  props<{ error: any }>()
);


// Save Questions Progress
export const saveQuestionProgress = createAction(
    '[SaveQuestion] SaveQuestionProgcess',
    props<{ question: Question }>()
  );

  // Save Questions Progress Successful
  export const saveQuestionProgressSuccess = createAction(
    '[SaveQuestion] SaveQuestionProgcessSuccessfully',
    props<{ token: string }>()
  );

  // Save Questions Progress Failure
  export const saveQuestionProgressFail = createAction(
    '[SaveQuestion] saveQuestionProgcessFail',
    props<{ error: any }>()
  );


  // Update Questions Progress
export const updateUserProgress = createAction(
  '[UpdateQuestion] updateUserProgress',
  props<{ progress: onBoardingProgress }>()
);

// Update Questions Progress Successful
export const updateUserProgressSuccess = createAction(
  '[UpdateQuestion] UpdateProgcessSuccessfully',
  props<{ token: string }>()
);

// Update Questions Progress Failure
export const updateUserProgressFail = createAction(
  '[UpdateQuestion] updateUserProgressFail',
  props<{ error: any }>()
);

  // Credits Qustions
export const creditProgress = createAction(
  '[credit] creditProgress',
  props<{ credits: Credit }>()
);

// Credits Questions Successful
export const creditProgressSuccess = createAction(
  '[credit] creditProgressSuccess',
  props<{ token: string }>()
);

// Credits Question Failure
export const creditProgressFail = createAction(
  '[onBoarding] creditProgressFail',
  props<{ error: any }>()
);
