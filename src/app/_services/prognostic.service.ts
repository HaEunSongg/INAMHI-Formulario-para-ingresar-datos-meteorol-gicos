import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Form } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class PrognosticService {
    Form(value: any) {
      throw new Error('Method not implemented.');
    }
    private formSubject: BehaviorSubject<Form|null>;
    public form: Observable<Form | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.formSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('form')!));
        this.form = this.formSubject.asObservable();
    }

    public get userValue() {
        return this.formSubject.value;
    }

    from(tempmax: string, tempmin: string) {
        return this.http.post<Form>(`${environment.apiUrl}/form/authenticate`, { tempmax, tempmin })
            .pipe(map(form => {
                // store form prognostic details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('form', JSON.stringify(form));
                this.formSubject.next(form);
                return form;
            }));
    }

    remove() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('form');
        this.formSubject.next(null);
        this.router.navigate(['/Formulario/form']);
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
                    const form = { ...this.userValue, ...params };
                    localStorage.setItem('form', JSON.stringify(form));

                    // publish updated user to subscribers
                    this.formSubject.next(form);
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
