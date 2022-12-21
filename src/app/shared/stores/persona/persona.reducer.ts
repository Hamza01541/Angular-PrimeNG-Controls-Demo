import { createReducer, on, Action } from '@ngrx/store';
import * as personaAction from "@app/shared/stores/persona/persona.actions";
import { initialPersonaState, PersonaState } from "@app/shared/stores/persona/persona.state"


const createPersonaReducer = createReducer(initialPersonaState,
  // Get Persona List
  on(personaAction.getPersonaListSuccess, (state, { personaList } ) => ({
    ...state,
    personaList
  })),
);

export function personaReducer(state: PersonaState = initialPersonaState, action: Action) {
  return createPersonaReducer(state, action);
}
