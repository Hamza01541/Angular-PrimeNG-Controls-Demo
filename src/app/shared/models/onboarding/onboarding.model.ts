export class Question {
    title?: string;
    identifier?: string;
    questionType?: string;
    dependedQuestion?:string ='';
    dependedAnswer?:string= '';
    questionId?:number=0;
    positionId?:number=1;
    inputType?:string='radio'
    answers?:any ;  // any for single selection (i.e., radio buttons) and any[] for multiple choice (i.e., checkbox)
}

export class Answer {
    title?:string;
    identifier?: string;
    answerType?:string;
    sequence?:number=1;
    custom_text?:string;
    selected?: string;
}

export class onBoardingProgress {
  onboarding_completed?: boolean;
  onboarding_progress?: {
    completed_steps?: CompletedSteps[];
  }
}

export class CompletedSteps {
  id?: string;
  identifier?: string;
  title?: string;
}
