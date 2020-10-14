import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user-model';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent {

    @Input()
    users: Observable<User[]>;

    @Output() editUser: EventEmitter<User> = new EventEmitter();

    labels = [
        'Name',
        'UserName',
        'Email',
        'Address',
        'Phone',
        'Website',
        'Company',
        "Edit"
    ];


    editSelected(user) {
        console.log('aaaaaaaaa-------->', user);
        this.editUser.emit(user);
    }

}
