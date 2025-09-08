import {Component, OnInit, ViewChild} from '@angular/core';
import {TabConfig, UserForm} from './categories';
import {CategoryService} from './app.service';
import {MainComponent} from './main/main.component';
import {Subscription} from 'rxjs';
import {NgcCookieConsentService} from 'ngx-cookieconsent';
import {CookieService} from 'ngx-cookie';
import {AlertService} from './alert.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {

  @ViewChild('dqt', {static: false}) mainComponent: MainComponent;
  title = 'Adult Changes in Thought Data Query Tool';
  authenticated = false;
  ieComment = 'You may experience issues with your current browser.';
  tabs: TabConfig[] = [];
  selectedTab = 0;
  private isFirstRun = true;
  private cookieName = 'login';
  private cookieConfig: any = {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)  // one year
  };
  private popupOpenSubscription: Subscription;


  ngOnInit(): void {
  }

  constructor(
    private categoryService: CategoryService,
    private ccService: NgcCookieConsentService,
    private cookieService: CookieService,
    private alertService: AlertService
  ) {
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
    this.getTabs();
    let cookie = this.cookieService.get(this.cookieName);
    if (cookie !== undefined) {
      this.categoryService.communicateCookie(cookie)
        .subscribe(r => {
          this.alertService.showMessages(r.messages);
          if (r['status']) {
            this.authenticated = true;
          }
        })
    } else {
      this.checkAuthenticated();
    }
  }

  userFormSubmitted(event) {
    let userModel: UserForm = event.userForm;
    this.categoryService.submitUserForm(userModel)
      .subscribe(result => {
        this.authenticated = result.validUser;
        this.cookieService.put(
          this.cookieName,
          result.cookie,
          this.cookieConfig
        );
        this.alertService.showMessages(result.messages);
    });
  }

  checkAuthenticated() {
    this.categoryService.checkAuthenticated()
      .subscribe(result => {
        this.authenticated = result.returnVisitor;
        this.cookieService.put(
          this.cookieName,
          result.cookie,
          this.cookieConfig
        );
        this.alertService.showMessages(result.messages);
      });
  }

  getTabs() {
    this.categoryService.getTabs()
      .subscribe(result => this.tabs = result.tabs as TabConfig[]);
  }

  dismissIEComment() {
    this.ieComment = '';
  }

  goToQueryTool(status: boolean) {
    this.selectedTab = 0;
    if (status) {
      this.selectedTab = this.tabs.length;
    } else {
      this.selectedTab = 0;
    }
  }

  onTabChange(val: number) {
    this.selectedTab = val;
  }
}
