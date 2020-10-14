import { createAction, props } from '@ngrx/store';
import { User } from '../models/user-model';

export const GetUserList = createAction(
    '[GetUserList] Get User List Request'
);

export const GetUserListSuccess = createAction(
    '[GetUserList] Get User List Request Success',
    props<{ response: User[] }>()
);

export const GetUserListError = createAction(
    '[GetUserList] Get User List Request Error',
);

export const SetUserForEditRequest = createAction(
    '[UserForEdit] Set User for Edit Request',
    props<{ payload: User }>()
);


export const UpdateUserRequest = createAction(
    '[UpdateUser] Update User Request',
    props<{ payload: User }>()
);