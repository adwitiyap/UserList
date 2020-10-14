import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    constructor(
        private readonly http: HttpClient
    ) { }

    getUserList() {
        const link = 'https://jsonplaceholder.typicode.com/users';

        return this.http.get(link);
    }
}