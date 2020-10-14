import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, find, subscribeOn, takeUntil } from 'rxjs/operators';

import * as fromUserActions from '../../../store/users.actions';

import { User } from 'src/app/models/user-model';
import { usersResponseState } from 'src/app/store/users.selectors';

/* 
    NOTE: This component should be broken down as per container-dumb philosophy. But not doing that in interest of time.
    Demonstration of container-dumb componenent architecture has been made through "users-container" & "users" components
*/

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    user: User;
    userForm: FormGroup;
    routeUnsubscribe: Subject<void> = new Subject();
    isSavedClicked = false;

    constructor(private readonly route: ActivatedRoute, private readonly store: Store<any>) { }

    ngOnInit() {
        const routeParams$ = this.route.paramMap;
        const users$ = this.store.select(usersResponseState);

        combineLatest([routeParams$, users$])
            .pipe(
                takeUntil(this.routeUnsubscribe)
            )
            .subscribe(([params, users]) => {
                this.user = users.find(user => user.id === parseInt(params.get('userId')));
            });

        this.userForm = new FormGroup({
            name: new FormControl(this.user.name, { validators: [Validators.required] }),
            userName: new FormControl(this.user.username, { validators: [Validators.required] }),
            email: new FormControl(this.user.email, { validators: [Validators.required] }),
            addressStreet: new FormControl(this.user.address.street, { validators: [Validators.required] }),
            addressSuite: new FormControl(this.user.address.suite, { validators: [Validators.required] }),
            addressCity: new FormControl(this.user.address.city, { validators: [Validators.required] }),
            addressZip: new FormControl(this.user.address.zipcode, { validators: [Validators.required] }),
            addressGeoLat: new FormControl(this.user.address.geo.lat, { validators: [Validators.required] }),
            addressGeoLong: new FormControl(this.user.address.geo.lng, { validators: [Validators.required] }),
            phone: new FormControl(this.user.phone, { validators: [Validators.required] }),
            website: new FormControl(this.user.website, { validators: [Validators.required] }),
            companyName: new FormControl(this.user.company.name, { validators: [Validators.required] }),
            companyCatch: new FormControl(this.user.company.catchPhrase, { validators: [Validators.required] }),
            companyBs: new FormControl(this.user.company.bs, { validators: [Validators.required] })
        });

    }

    savePressed() {
        this.isSavedClicked = true;
    }

    cancelPressed() {
        this.isSavedClicked = false;
    }

    save() {
        const updatedUser: User = {
            id: this.user.id,
            name: this.userForm.controls.name.value,
            username: this.userForm.controls.userName.value,
            email: this.userForm.controls.email.value,
            address: {
                street: this.userForm.controls.addressStreet.value,
                suite: this.userForm.controls.addressSuite.value,
                city: this.userForm.controls.addressCity.value,
                zipcode: this.userForm.controls.addressZip.value,
                geo: {
                    lat: this.userForm.controls.addressGeoLat.value,
                    lng: this.userForm.controls.addressGeoLong.value
                }
            },
            phone: this.userForm.controls.phone.value,
            website: this.userForm.controls.website.value,
            company: {
                name: this.userForm.controls.name.value,
                catchPhrase: this.userForm.controls.companyCatch.value,
                bs: this.userForm.controls.companyBs.value
            },
            isUpdated: true
        }

        console.log('Updating---------->', updatedUser);

        this.store.dispatch(fromUserActions.UpdateUserRequest({ payload: updatedUser }));
    }

    ngOnDestroy() {
        this.routeUnsubscribe.next();
        this.routeUnsubscribe.complete();
    }
}
