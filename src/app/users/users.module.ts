import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ApiService } from '../services/api-service';

import { SLICE_ID_USERS, reducer } from '../store/users.reducer';
import { UsersEffects } from '../store/users.effects';

import { UsersContainerComponent } from './components/users-container/users.container.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

const userRoutes: Routes = [
    {
        path: 'users',
        component: UsersContainerComponent
    },
    {
        path: 'edit/:userId',
        component: EditUserComponent
    }
];

@NgModule({
    declarations: [UsersContainerComponent, UsersComponent, EditUserComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        StoreModule.forFeature(SLICE_ID_USERS, reducer),
        EffectsModule.forRoot([UsersEffects]),
        RouterModule.forRoot(userRoutes)
    ],
    exports: [UsersContainerComponent, UsersComponent, EditUserComponent],
    providers: [ApiService, HttpClient]
})
export class UsersModule { }
