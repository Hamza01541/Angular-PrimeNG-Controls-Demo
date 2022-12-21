import { Injectable } from '@angular/core';
import { changeLoaderState, ILookupState } from '@app/shared/stores';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor(private store: Store<ILookupState>) { }

  /**
   * Shows loader
   */
  showLoader() {
    this.store.dispatch(changeLoaderState({ isLoading: true }));
  }

  /**
   * Hides loader
   */
  hideLoader() {
    this.store.dispatch(changeLoaderState({ isLoading: false }));
  }
}
