import {
  submitQuestionProcess,
  creditProgress,
  saveQuestionProgress,
  updateUserProgress,
  getQuestionList
}
  from '@app/modules/onboarding/store/onboarding.actions';
import { Question, Answer } from '@app/shared/models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IQuestionState } from '@app/modules/onboarding/store/onboarding.state';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getQuestionListSelector } from '@app/modules/onboarding/store/onboarding.selectors';
import { AppRoutes, QuestionnaireSchema } from '@app/shared/constants';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnBoardingComponent implements OnInit, OnDestroy {

  appRoutes = AppRoutes;
  step = 0;
  currentTabindex = 0;
  questions: any;
  answer: Answer;
  currentCase: any;
  thirdQuestion: any;
  answers: Answer[] = [];
  showInput: boolean = false;
  firstQestionProgress = 0;
  tabTitle: string = '';
  credits: number = 0;
  checkLength: boolean;
  isShowCustomInput: boolean = false;
  isUseCasestoggled: boolean = false;
  isSaletoggled: boolean = false;
  secondQuestionProgress = 0;
  progressQuestionLoaded: boolean = false;
  custom_answer: string = '';
  questionnaireSchema = QuestionnaireSchema;
  getQuestionListSubscription$: Subscription = new Subscription();

  constructor(
    private onBoardingStore: Store<IQuestionState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getQuestionList();

    this.route.queryParams.subscribe((params) => {
      switch (params.identifier) {
        case 'team_and_role':
          this.currentTabindex = 1;
          this.step++;
          this.checkLength = true;
          break;

        case 'use_cases':
          this.currentTabindex = 2;
          this.step++;
          this.checkLength = true;
          break;

        default:
          this.currentTabindex = 0;
          break;
      }

      this.loadQuestionsList(params.userId);
    });
  }

  /**
   * Moves user to next step
   */
  nextStep() {
    this.step++;
    this.getCurrentTabTitle();
  }

  /**
   * Opens previous step (i.e., intro step)
   */
  previousStep() {
    this.step--;
  }

  /**
   * Loads next slide questions, updates cretits and gets current tab title
   */
  openNext() {
    // only allow next button click when user give answer to all questions of current slide
    if (this.isFormValid()) {
      this.currentTabindex = this.currentTabindex + 1;
      if (this.currentTabindex == 1) {
        if (this.firstQestionProgress > 0) {
          this.firstQestionProgress = 3;
          this.saveQuestion(this.questions);
        }
      }
      // Use Cases Questions
      if (this.currentTabindex == 2) {
        if (this.secondQuestionProgress > 0) {
          this.secondQuestionProgress = 2;
          this.saveQuestion([this.currentCase]);
        }
      }

      this.updateUserProgress();
      this.updateCredits();
      this.loadUseCases();
      this.getCurrentTabTitle();
    }
  }

  /**
   * CHecks either current tab form is valid or not
   * @returns
   */
  isFormValid() {
    return (((!this.isShowCustomInput || (this.isShowCustomInput && this.custom_answer.length > 0)) && this.currentTabindex === 0 &&
      this.firstQestionProgress >= 2) || (this.currentTabindex === 1 && this.secondQuestionProgress >= 1));
  }

  /**
   * Loads use cases according to selected team and roles
   */
  loadUseCases() {
    const submittedQuestion: any = this.questions.filter((x: any) => x.identifier === 'q_role_sale');

    if (
      submittedQuestion &&
      submittedQuestion[0] &&
      submittedQuestion[0].answers &&
      !this.progressQuestionLoaded
    ) {
      const submittedQuestionIdentifier =
        submittedQuestion[0].answers.identifier;
      this.currentCase = QuestionnaireSchema.step2.questions.find(
        (question) => question.dependedAnswer === submittedQuestionIdentifier
      );
    }

    this.reOrderUseCasePriority();
  }

  /**
   * Updated credit count
   */
  updateCredits() {
    if (this.firstQestionProgress === 3) {
      this.credits = 5;
    }

    if (this.secondQuestionProgress === 2) {
      this.credits = 10;
    }
  }

  /**
   * Gets title of current active tab/slide
   */
  getCurrentTabTitle() {
    if (this.currentTabindex === 0) {
      this.tabTitle = 'Team & Role';
    } else if (this.currentTabindex === 1) {
      this.tabTitle = 'Use Cases for Sales';
    } else {
      this.tabTitle = 'Where do you want to start?';
    }
  }

  /**
   * Opens previous slide
   */
  openPrev() {
    if (this.step === 1 && this.currentTabindex === 0) {
      this.step = 0;
    }

    this.currentTabindex =
      this.currentTabindex === 0 ? 0 : this.currentTabindex - 1;
    this.getCurrentTabTitle();
  }

  /**
   * Load Question List
   */
  loadQuestionsList(userId: string) {
    this.questions = this.questionnaireSchema.step1.questions;
    this.currentCase = this.questionnaireSchema.step2.questions;
    this.thirdQuestion = this.questionnaireSchema.step3.questions;
    this.onBoardingStore.dispatch(getQuestionList({ userId: userId }));
  }

  /**
   * Gets already submitted question list
   */
  getQuestionList() {
    this.getQuestionListSubscription$ = this.onBoardingStore
      .pipe(select(getQuestionListSelector))
      .subscribe((questionList: any) => {
        if (questionList) {
          questionList = questionList.questions;
          if (this.currentTabindex > 0) {
            let firstStepQuestions: any = this.questionnaireSchema.step1.questions;
            let secondStepQuestions: any;
            if (this.currentTabindex > 1) {
              secondStepQuestions = this.questionnaireSchema.step2.questions;
            }
            if (firstStepQuestions) {
              this.firstQestionProgress = 3;
              for (let currentQuestion of questionList) {
                for (let question of firstStepQuestions) {
                  if (question.identifier === currentQuestion.identifier) {
                    for (let answer of currentQuestion.answers) {
                      const foundAnswer = question.answerQuestions.find(
                        (x: any) => x.identifier === answer.identifier
                      );
                      if (foundAnswer) {
                        question.answers = foundAnswer;
                      }
                    }
                  }
                }
              }

              this.questions = firstStepQuestions;
              this.otherTextValue();
              this.loadUseCases();
              this.updateCredits();
            }

            if (secondStepQuestions) {
              this.secondQuestionProgress = 1;
              this.currentCase = secondStepQuestions;
              this.progressQuestionLoaded = true;
            }
          }
        }
      });
  }

  /**
   * Triggers on radio button selection (1st slide right now)
   * Clears next slide answers
   */
  selectedAnswer(currentQuestion: Question, answer: Answer) {
    this.progressQuestionLoaded = false;
    this.firstQestionProgress = currentQuestion.positionId;
    // On 1st slide selection, empty selected use cases
    currentQuestion.answers.selected = true;

    this.checkLength =
      this.currentTabindex === 0 && currentQuestion.positionId <= 2;
    this.isShowCustomInput = answer.identifier === 'a_role_sale_other';
    this.clearSelectedUseCases();
    this.updateCredits();
  }

  /**
   *  Add other role input
   */
  otherTextValue() {
    for (let question of this.questions) {
      let currentAns = question.answerQuestions.find(
        (x: any) => x.identifier === 'a_role_sale_other'
      );
      if (currentAns) {
        currentAns.custom_answer = this.custom_answer;
      }
    }
  }

  /**
   * Clears selected use cases
   */
  clearSelectedUseCases() {
    if (this.currentCase && this.currentCase.answerQuestions) {
      this.currentCase.answerQuestions.map((x: any) => (x.selected = false));
      this.currentCase.answers = [];
    }

    this.secondQuestionProgress = 0;
    this.isUseCasestoggled = true;
    this.toggleUseCases();
  }

  /**
   * Triggers on usecase checkbox click
   * Updates credits and current tab title
   * @param answerQuestions
   * @param currentQuestion
   */
  onCheckboxChange(answerQuestions: any) {
    const currentIndex = this.currentCase.answers.findIndex((x: any) => x === answerQuestions);

    if (currentIndex > -1) {
      this.currentCase.answers.splice(currentIndex, 1);
    } else {
      this.currentCase.answers.push(answerQuestions);
    }
    this.secondQuestionProgress = this.currentCase.answers.length > 0 ? 1 : 0;
    this.updateCredits();
    this.reOrderUseCasePriority()
  }

  /**
   * Reorders selected use case priority numbers
   */
  reOrderUseCasePriority() {
    if (this.currentCase && this.currentCase.answerQuestions) {
      let currentSequence = 0;
      this.currentCase.answerQuestions.map((answerQuestion: any) => {
        if (answerQuestion.selected) {
          currentSequence++;
          answerQuestion.sequence = currentSequence;
        } else {
          answerQuestion.sequence = 0;
        }
        return answerQuestion
      });
    }
  }

  /**
   * Gets current use case priority sequence number
   * Displays priority number only for selected use cases, only if more than one use case is selected
   * @param currentAnswerQuestion
   * @param currentSequence
   * @returns
   */
  getCurrentSequence(currentAnswerQuestion: any) {
    if (currentAnswerQuestion && currentAnswerQuestion.selected && this.currentCase.answers && this.currentCase.answers.length > 1) {
      return currentAnswerQuestion.sequence;
    }
  }

  /**
   * Toggles Use cases
   */
  toggleUseCases() {
    this.isUseCasestoggled = !this.isUseCasestoggled;

    if (this.currentCase && this.currentCase.answers) {
      if (
        this.isUseCasestoggled &&
        this.currentCase.answerQuestions && this.currentCase.answerQuestions.length === 3
      ) {
        this.currentCase.answerQuestions = [
          ...this.currentCase.answerQuestions,
          ...this.currentCase.extraQuestions,
        ];
      } else if (!this.currentCase.answers.some((v: any) => v.selected)) {
        this.currentCase.answerQuestions = this.currentCase.answerQuestions.slice(
          0,3
        );
      }
    }
  }

  /**
   * Toggles answers
   */
  toggleRole() {
    this.isSaletoggled = !this.isSaletoggled;
    const ind = this.questions.find((x: any) => x.identifier == 'q_role_sale');

    if (this.isSaletoggled && ind.answerQuestions.length === 3) {
      ind.answerQuestions = [...ind.answerQuestions, ...ind.extraQuestions];
    } else if (!ind.answers.some((v: any) => v.selected)) {
      ind.answerQuestions = ind.answerQuestions.slice(0, 3);
    }
  }

  /**
   * Post Question API request
   */
  postQuestion(questions: Question) {
    this.onBoardingStore.dispatch(
      submitQuestionProcess({ question: questions })
    );
  }

  /**
   * Sends Credit Question API request
   */
  creditQuestion() {
    const credits = {
      credits: this.credits,
      onboarding_entity_type: 'step',
      onboarding_entity_name: 'Team & role',
    };
    this.onBoardingStore.dispatch(creditProgress({ credits }));
  }

  /**
   * Save Questions Progress API request
   */
  saveQuestion(questions: Question[]) {
    let questionProgress: any = [];

    for (const currentQuestion of questions) {
      questionProgress.push({
        title: currentQuestion.title,
        identifier: currentQuestion.identifier,
        question_type: currentQuestion.questionType,
        answers: currentQuestion.answers && currentQuestion.answers.length > 0 ? currentQuestion.answers : [currentQuestion.answers]
      });
    }
    this.onBoardingStore.dispatch(saveQuestionProgress({ question: questionProgress }));
  }

  /**
  * @todo
  * Redirects user to
  * @param routeName
  */
  finishOnBoarding(currentAnswer: any) {
    currentAnswer.selected = true;
    const questionProgress: any = [];

    for (const currentQuestion of this.thirdQuestion) {
      questionProgress.push({
        title: currentQuestion.title,
        identifier: currentQuestion.identifier,
        question_type: currentQuestion.questionType,
        answers: [currentAnswer]
      });
    }

    this.onBoardingStore.dispatch(saveQuestionProgress({ question: questionProgress }));

    this.currentTabindex = this.currentTabindex + 1;
    this.updateUserProgress();

    let selectedRoute = AppRoutes.dashboard;

    /** @todo => Perform other operation later according to implementations */
    // if(currentAnswer.identifier === 'a_start_experience_serach_verify'){

    // }else if(currentAnswer.identifier === 'a_start_experience_chrome_extension'){

    // }

    this.router.navigate([selectedRoute]);
  }

  /**
   * Redirects user to givven route
   * @param {string} route Route on which user should be redirected
   */
  redirectTo(route: string) {
    this.router.navigate([route]);
  }

  /**
   * Gets images
   */
  getImage(imageName: string) {
    return `assets/images/${imageName}.svg`;
  }

  /**
   * Update onboarding Progress API request
   */
  updateUserProgress() {
    let completed_steps: any = [
      { id: 1, identifier: 'team_and_role', title: 'Team and Role' },
      { id: 2, identifier: 'use_cases', title: 'Use Cases' },
      { id: 3, identifier: 'starting_point', title: 'Starting Point' }
    ];

    completed_steps = completed_steps.filter((x: any) => this.currentTabindex >= x.id);

    const progress = {
      onboarding_completed: this.currentTabindex < 2 ? false : true,
      onboarding_progress: {
        completed_steps
      },
    };

    this.onBoardingStore.dispatch(updateUserProgress({ progress: progress }));
  }

  ngOnDestroy() {
    if (this.getQuestionListSubscription$) {
      this.getQuestionListSubscription$.unsubscribe();
    }
  }
}
