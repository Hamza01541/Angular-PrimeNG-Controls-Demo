import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PersonaState } from "@app/shared/stores/persona/persona.state";

export const PersonaFeatureSelector = createFeatureSelector<PersonaState>('persona');

export const personaListSelector = createSelector(PersonaFeatureSelector,(state) => state.personaList)