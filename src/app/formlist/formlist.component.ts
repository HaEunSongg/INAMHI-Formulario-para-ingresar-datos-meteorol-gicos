import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '@app/_services';

@Component({
  templateUrl: 'formlist.component.html',
  styleUrls: ['./formlist.component.css'],
})
export class FormListComponent implements OnInit {
  users?: any[];
forms: any;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {
    this.accountService
      .getAll()
      .pipe(first())
      .subscribe(
        (forms) => (this.forms = forms));

  }

  deleteUser(id: string) {
    const form = this.forms!.find((x: { id: string; }) => x.id === id);
    form.isDeleting = true;
    this.accountService
      .delete(id)
      .pipe(first())
      .subscribe(() => (this.forms = this.forms!.filter((x: { id: string; }) => x.id !== id)));
  }
}

const now = new Date();
console.log(now.toUTCString());
