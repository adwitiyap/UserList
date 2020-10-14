import { createReducer, on, Action, State } from '@ngrx/store';

import * as fromUsersActions from './users.actions';
import { User } from '../models/user-model';

export const SLICE_ID_USERS = 'users';

export interface UsersState {
    userList: User[],
    loadingUsers: boolean,
    editUser: User
}

export const initialState = {
    userList: [],
    loadingUsers: false,
    editUser: null
};

export const UsersReducer = createReducer(
    initialState,
    on(fromUsersActions.GetUserList,
        (state) => ({ ...state, loadingUsers: true })
    ),
    on(fromUsersActions.GetUserListSuccess,
        (state, { response }) => ({
            ...state,
            loadingUsers: false,
            userList: [...state.userList, response].reduce((a, b) => a.concat(b), [])
        })
    ),
    on(fromUsersActions.GetUserListError,
        (state) => ({ ...state, loadingUsers: false })
    ),

    on(fromUsersActions.SetUserForEditRequest,
        (state, { payload }) => ({ ...state, editUser: payload })
    ),

    on(fromUsersActions.UpdateUserRequest,
        (state, { payload }) => ({
            ...state,
            userList: [...state.userList.filter(user => user.id !== payload.id), payload].reduce((a, b) => a.concat(b), [])
        })

    )
);

export function reducer(state: UsersState, action: Action) {
    return UsersReducer(state, action);
}
