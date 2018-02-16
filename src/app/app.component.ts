import {Component, OnInit, ViewChild} from '@angular/core';
import {TabConfig, UserForm} from './categories';
import {CategoryService} from './app.service';
import {MainComponent} from './main/main.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('dqt') mainComponent: MainComponent;
  title = 'Adult Changes in Thought Data Query Tool';
  authenticated = false;
  ieComment = 'You may experience issues with your current browser.';
  tabs: TabConfig[] = [];

  ngOnInit(): void {
  }

  constructor(private categoryService: CategoryService) {
    this.getTabs();
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

  getTabs() {
    this.categoryService.getTabs()
      .subscribe(result => this.tabs = result.tabs as TabConfig[]);
  }

  dismissIEComment() {
    this.ieComment = '';
  }
}
