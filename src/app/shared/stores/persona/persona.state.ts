import { Persona } from "@app/shared/models";

export interface PersonaState {
  personaList: Persona[]
}

export const initialPersonaState: PersonaState = {
  personaList: []
};
