import { onBoardingProgress, Question } from '@app/shared/models';
import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/services/request.service';
import { ApiUrl } from '@app/shared/constants';
import { Observable, of } from 'rxjs';
import { Credit } from '@app/shared/models';
import { LocalStorageService } from '@app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OnBoardingService {
  constructor(private requestService: RequestService, private storageService: LocalStorageService) { }

  /**
   * Gets already submitted Question list
   * @param {string} Current LoggedIn user id
   * @returns {Observable<any>}
   */
  getQuestionList(userId: string): Observable<any> {
    return this.requestService.get(`${ApiUrl.baseBackendUrl}/${ApiUrl.users}/${userId}/${ApiUrl.usersOnBoardingQuestions}`);
  }

  /**
   * Submits answers
   * @param {Question} question
   * @returns {Observable<any>}
   */
   postQuestionProgcess(question: Question): Observable<any> {
    return this.requestService.post(`${ApiUrl.baseBackendUrl}/${ApiUrl.usersOnBoardingQuestions}`, { question });
  }

  /**
   * Save answers
   * @param {Question} question
   * @returns {Observable<any>}
   */
  saveQuestionProgcess(questions: Question): Observable<any> {
    return this.requestService.post(`${ApiUrl.baseBackendUrl}/users/${this.storageService.get('user_id')}/${ApiUrl.usersOnBoardingQuestions}/${ApiUrl.createMultiple}`, { questions});
  }

  /**
   * Updates user's onboarding progress
   * @param {Question} question
   * @returns {Observable<any>}
   */
   updateUserProgress(onboarding_progression: onBoardingProgress): Observable<any> {
    return this.requestService.put(`${ApiUrl.baseBackendUrl}/${ApiUrl.updateOnBoardingProgression}`, { onboarding_progression });
  }

   /**
   * Updates User's Credits
   * @param {Question}
   * @returns {Observable<any>}
   */
    onBoardingCredit(credit:Credit): Observable<any> {
      return this.requestService.put(`${ApiUrl.baseBackendUrl}/${ApiUrl.usersOnBoardingCredit}`, credit);
    }
}
