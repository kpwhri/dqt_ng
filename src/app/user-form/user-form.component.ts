import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {UserForm} from '../categories';
import {CategoryService} from '../app.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  model: UserForm = new UserForm();

  public userForm = this.formBuilder.group({
    name: new FormControl(this.model.name, [Validators.required, Validators.minLength(4)]),
    email: new FormControl(this.model.email, [Validators.required, Validators.pattern(new RegExp('^\\s*\\S+@\\S+\\.\\S+\\s*$'))]),
    affiliation: new FormControl(this.model.affiliation),
    reasonForUse: new FormControl(this.model.reasonForUse, [Validators.required, Validators.minLength(4)])
  });


  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  update(event) {
    this.model = this.userForm.value;
    this.onChange.emit({userForm: this.model});
  }
}
