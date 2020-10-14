import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


import { User } from '../../../models/user-model';

import * as fromUserActions from '../../../store/users.actions';
import { usersResponseState } from '../../../store/users.selectors';

@Component({
    selector: 'app-users-container',
    templateUrl: './users.container.component.html',
    styleUrls: ['./users.container.component.scss']
})
export class UsersContainerComponent implements OnInit {

    customerForm: FormGroup;
    users$: Observable<User[]>;

    constructor(private readonly store: Store<any>) { }

    ngOnInit() {
        this.users$ = this.store
            .pipe(
                select(usersResponseState),
                tap(usersInStore => {
                    if (usersInStore.length < 1) {
                        this.requestUsersData();
                    }
                })
            );
    }

    onEditUser(user) {
        this.setUserForEdit(user);
    }

    private setUserForEdit(user) {
        this.store.dispatch(fromUserActions.SetUserForEditRequest(user));
    }

    private requestUsersData() {
        console.log('Gooooooooooooooooooooooooooo')
        this.store.dispatch(fromUserActions.GetUserList());
    }
}
