import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './users.reducer';

export const usersSliceState =
    createFeatureSelector<fromReducer.UsersState>(fromReducer.SLICE_ID_USERS);

export const usersResponseState = createSelector(
    usersSliceState,
    (state) => state && state.userList
);

export const usersLoadingState = createSelector(
    usersSliceState,
    (state) => state && state.loadingUsers
);

export const editUserState = createSelector(
    usersSliceState,
    (state) => state && state.editUser
);
