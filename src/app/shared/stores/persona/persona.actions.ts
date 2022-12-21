import { Persona } from '@app/shared/models';
import { createAction, props } from '@ngrx/store';

// Listing of User Persona
export const getPersonaList = createAction(
  '[Persona] getPersona List',
  props<{ startIndex: any }>()
);

// On successful Persona
export const getPersonaListSuccess = createAction(
  '[Persona] getPersona List Success',
  props<{ personaList: Persona[] }>()
);
