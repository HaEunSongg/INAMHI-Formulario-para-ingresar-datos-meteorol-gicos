import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Form } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<Form | null>;
    public user: Observable<Form | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    from(tempmax: string, tempmin: string) {
        return this.http.post<Form>(`${environment.apiUrl}/users/authenticate`, { tempmax, tempmin })
            .pipe(map(form => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('form', JSON.stringify(form));
                this.userSubject.next(form);
                return form;
            }));
    }

    remove() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('form');
        this.userSubject.next(null);
        this.router.navigate(['/account/form']);
    }

    submit(form: Form) {
        return this.http.post(`${environment.apiUrl}/Formulario/form`, form);
    }

    getAll() {
        return this.http.get<Form[]>(`${environment.apiUrl}/form`);
    }

    getById(id: string) {
        return this.http.get<Form>(`${environment.apiUrl}/form/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/form/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue?.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('form', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/form/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue?.id) {
                    this.remove();
                }
                return x;
            }));
    }
}
