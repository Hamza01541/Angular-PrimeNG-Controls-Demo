import { Injectable } from "@angular/core";
import * as personaAction from "@app/shared/stores/persona/persona.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { PersonaService } from "@app/core/services/persona/persona.service";

@Injectable()
export class PersonaEffects {
  constructor(
    private actions$: Actions,
    private personaService: PersonaService
  ) { }

  /**
   * For Getting Persona List of User.
   */
  getPersonaLists$ = createEffect(() => this.actions$.pipe(ofType(personaAction.getPersonaList),
    switchMap((action) => {
      return this.personaService.getPersonaLists(action.startIndex).pipe(map((res) => {
        return personaAction.getPersonaListSuccess({ personaList: res.personas });
      })
      );
    })
  )
  );
}