import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {CategoryService} from './app.service';
import {CheckboxValueComponent} from './checkbox-value/checkbox-value.component';
import {CategoryMasterComponent} from './category-master/category-master.component';
import {CategoryComponent} from './category/category.component';
import {ItemComponent} from './item/item.component';
import {ValueComponent} from './value/value.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {RouterModule} from '@angular/router';
import {MenuListener} from './menuListener';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {SubjectTableComponent} from './subject-table/subject-table.component';
import {FilterDialogComponent} from './filter-dialog/filter-dialog.component';
import {MainComponent} from './main/main.component';
import {HomePageComponent} from './home-page/home-page.component';
import {FaqPageComponent} from './faq-page/faq-page.component';
import {UserFormComponent} from './user-form/user-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ClipboardModule} from 'ngx-clipboard';
import {SearchDialogComponent} from './search-dialog/search-dialog.component';
import {LoaderService} from './loader.service';
import {SpinnerComponent} from './spinner/spinner.component';
import {NgcCookieConsentConfig, NgcCookieConsentModule} from 'ngx-cookieconsent';
import {environment} from '../ENVIRONMENTS/environment';
import {CookieModule} from 'ngx-cookie';
import {AlertService} from './alert.service';
import {MessageHistoryDialogComponent} from './message-history-dialog/message-history-dialog.component';
import {GoogleAgeChartComponent, IdIncrement} from './google-age-chart/google-age-chart.component';
import {DataDictionaryComponent} from './data-dictionary/data-dictionary.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SliderModule} from 'primeng/slider';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {AccordionModule} from 'primeng/accordion';
import {MenubarModule} from 'primeng/menubar';
import {DialogModule} from 'primeng/dialog';
import {TooltipModule} from 'primeng/tooltip';
import {FieldsetModule} from 'primeng/fieldset';
import {SharedModule} from 'primeng/api';
import {TabsModule} from 'primeng/tabs';
import {providePrimeNG} from 'primeng/config';
import Nora from '@primeuix/themes/nora';
import Aura from '@primeuix/themes/aura';

const cookieConfig: NgcCookieConsentConfig = {
  'cookie': {
    'domain': environment.domain,
    'expiryDays': 365
  },
  'position': 'bottom',
  'theme': 'classic',
  'palette': {
    'popup': {
      'background': '#434343',
      'text': '#ffffff',
      'link': '#ffffff'
    },
    'button': {
      'background': '#0683ff',
      'text': '#ffffff',
      'border': 'transparent'
    }
  },
  'type': 'info',
  'content': {
    'message': 'In order to expedite the login process, we use a cookie. ' +
      'By further use of this website, you agree to our use of cookies.',
    'dismiss': 'Dismiss',
    'deny': 'Refuse cookies',
    'link': 'Learn More About Cookies',
    'href': 'https://cookiesandyou.com'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    CheckboxValueComponent,
    CategoryMasterComponent,
    CategoryComponent,
    ItemComponent,
    ValueComponent,
    GoogleAgeChartComponent,
    BreadcrumbComponent,
    SubjectTableComponent,
    FilterDialogComponent,
    MainComponent,
    HomePageComponent,
    FaqPageComponent,
    UserFormComponent,
    SearchDialogComponent,
    SpinnerComponent,
    MessageHistoryDialogComponent,
    GoogleAgeChartComponent,
    DataDictionaryComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    CookieModule.forRoot(),
    NgcCookieConsentModule.forRoot(cookieConfig),
    MatTooltipModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    SliderModule,
    ToggleButtonModule,
    FieldsetModule,
    TooltipModule,
    DialogModule,
    MenubarModule,
    AccordionModule,
    ClipboardModule,
    SharedModule,
    TabsModule,
    ScrollPanelModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    providePrimeNG({
      theme: {
        preset: Nora
      }
    }),
    CategoryService,
    MenuListener,
    AlertService,
    LoaderService,
    IdIncrement,
    provideHttpClient(withInterceptorsFromDi())
  ],
})
export class AppModule {
}
