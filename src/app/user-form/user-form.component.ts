import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {UserForm} from '../categories';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css'],
    standalone: false
})
export class UserFormComponent implements OnInit {

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  model: UserForm = new UserForm();

  public userForm: ReturnType<FormBuilder['group']>;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: new FormControl(this.model.name, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(this.model.email, [Validators.required, Validators.pattern(new RegExp('^\\s*\\S+@\\S+\\.\\S+\\s*$'))]),
      affiliation: new FormControl(this.model.affiliation),
      reasonForUse: new FormControl(this.model.reasonForUse, [Validators.required, Validators.minLength(2)])
    });

  }

  update() {
    this.model.name = this.userForm.value['name'];
    this.model.email = this.userForm.value['email'];
    this.model.affiliation = this.userForm.value['affiliation'];
    this.model.reasonForUse = this.userForm.value['reasonForUse'];
    this.onChange.emit({userForm: this.model});
  }
}
