import { Credit } from '@app/shared/models';
import { Question } from '@app/shared/models';

/** State for Question store. */
export interface IQuestionState {
  questionList:Question[]
  credits: Credit[];
}

/** Initial state for Question store. */
export const initialQuestionState: IQuestionState = {
  questionList:[],
  credits:[]
};
