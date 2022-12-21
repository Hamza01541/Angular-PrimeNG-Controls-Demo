import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactSearchCriteria } from '@app/shared/models';
import { Persona } from '@app/shared/models/persona/persona.model';
import { getPersonaList } from '@app/shared/stores/persona/persona.actions';
import { personaListSelector } from '@app/shared/stores/persona/persona.selectors';
import { PersonaState } from '@app/shared/stores/persona/persona.state';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'filter-saved-persona-searches-list',
  templateUrl: './saved-persona-searches-list.component.html',
  styleUrls: ['./saved-persona-searches-list.component.scss']
})
export class SavedPersonaSearchesListComponent implements OnInit {
  showSavedPersonaLists: boolean;
  selectedPersona: Persona;
  savedPersonaList: Array<Persona>;
  defaultSaved: Array<Persona>;
  keyword: string;
  subscriptionList$: Array<Subscription> = [];
  isPersonaSelected: boolean;
  @Output() onApplySavedPersonaCriteria = new EventEmitter<Persona>();
  
  constructor(private personaStore: Store<PersonaState>) { }

  ngOnInit(): void {
    this.fetchPersonaLists();
  }

  /**
   * Gets Persona lists from store.
   */
  fetchPersonaLists() {
    this.subscriptionList$.push(
      this.personaStore
        .pipe(select(personaListSelector))
        .subscribe((response: any) => {
          if (response.length) {
            this.savedPersonaList = response;
            this.defaultSaved = this.savedPersonaList;
          }
        })
    );
  }

  /**
  * This shows Persona selection lists
  */
  showSavedPersona() {
    this.showSavedPersonaLists = true;
    this.personaStore.dispatch(getPersonaList({ startIndex: 0 }));
  }

  /**
   * Get the user selected persona
   */
  onSelectedPersona(persona: Persona) {
    this.selectedPersona = persona;
    this.showSavedPersonaLists = false;
    this.isPersonaSelected = true;
    this.onApplySavedPersonaCriteria.emit(persona);
  }

  /**
  * Remove the user selected persona criteria
  */
  removeSelected() {
    this.selectedPersona = null;
    this.isPersonaSelected = false;
    this.onApplySavedPersonaCriteria.emit(null);
  }

  /**
  * Searches the string from given array
  */
  onSearchElement(searchText: any) {
    if (searchText.length >= 1) {
      this.savedPersonaList = this.defaultSaved;
      this.savedPersonaList = this.savedPersonaList.filter(persona => persona.name.includes(searchText));
    } else {
      this.savedPersonaList = this.defaultSaved;
    }
  }

  onClearSearch() {
    this.savedPersonaList = this.defaultSaved;
  }

  ngOnDestroy() {
    this.subscriptionList$.forEach(sub$ => { if (sub$) { sub$.unsubscribe(); } });
  }
}
