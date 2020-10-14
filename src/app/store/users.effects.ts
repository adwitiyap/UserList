import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ApiService } from '../services/api-service';
import * as fromUsersActions from './users.actions';

@Injectable()
export class UsersEffects {

    GetUsersEffect$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(fromUsersActions.GetUserList),
                switchMap(action => {
                    return this.apiService.getUserList()
                        .pipe(
                            map((response: any) => {
                                return (fromUsersActions.GetUserListSuccess({ response }));
                            }),
                            catchError(() => {
                                return of(fromUsersActions.GetUserListError());
                            })
                        );
                })
            )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) { }
}
