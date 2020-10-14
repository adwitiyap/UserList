import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './users/components/edit-user/edit-user.component';
import { UsersContainerComponent } from './users/components/users-container/users.container.component';

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
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        StoreModule.forRoot({}),
        HttpClientModule,
        UsersModule,
        RouterModule.forRoot(userRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
