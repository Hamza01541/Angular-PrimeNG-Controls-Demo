import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IQuestionState } from "@app/modules/onboarding/store/onboarding.state";

export const onBoardingFeatureSelector = createFeatureSelector<IQuestionState>('onboarding')

/** Gets already submitted Question list  */
export const getQuestionListSelector = createSelector(onBoardingFeatureSelector,(state) => state.questionList)


/** Get Credit  */
export const getcreditSelector = createSelector(onBoardingFeatureSelector,(state) => state.credits)
