import {Component, OnInit} from '@angular/core';
import {UserForm} from './categories';
import {CategoryService} from './app.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  authenticated = false;

  ngOnInit(): void {
  }

  constructor(private categoryService: CategoryService) {
    this.checkAuthenticated();
  }

  userFormSubmitted(event) {
    let userModel: UserForm = event.userForm;
    this.categoryService.submitUserForm(userModel)
      .subscribe(result => this.authenticated = result.validUser);
  }

  checkAuthenticated() {
    this.categoryService.checkAuthenticated()
      .subscribe(result => this.authenticated = result.returnVisitor);
  }
}
