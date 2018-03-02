import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {CategoryService} from './app.service';
import { SliderModule } from 'primeng/primeng';
import {ToggleButtonModule} from 'primeng/primeng';
import { CheckboxValueComponent } from './checkbox-value/checkbox-value.component';
import { CategoryMasterComponent } from './category-master/category-master.component';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';
import {FieldsetModule} from 'primeng/components/fieldset/fieldset';
import { ValueComponent } from './value/value.component';
import {DialogModule} from 'primeng/components/dialog/dialog';
import { AgeChartComponent } from './age-chart/age-chart.component';
import {ChartModule} from 'primeng/components/chart/chart';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {MenubarModule} from 'primeng/components/menubar/menubar';
import {RouterModule} from '@angular/router';
import {MenuListener} from './menuListener';
import {AccordionModule} from 'primeng/components/accordion/accordion';
import {PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import { SubjectTableComponent } from './subject-table/subject-table.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import {ClipboardModule} from 'ngx-clipboard';
import {SharedModule, OverlayPanelModule} from 'primeng/primeng';
import { MainComponent } from './main/main.component';
import {TabViewModule} from 'primeng/components/tabview/tabview';
import { HomePageComponent } from './home-page/home-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { UserFormComponent } from './user-form/user-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatDialogModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import {LoaderService} from './loader.service';
import { SpinnerComponent } from './spinner/spinner.component';
import {NgcCookieConsentConfig, NgcCookieConsentModule, NgcCookieConsentService, NgcCookieConsentStatus} from 'ngx-cookieconsent';
import { environment } from '../environments/environment';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const cookieConfig: NgcCookieConsentConfig = {
  'cookie': {
    'domain': environment.domain
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
    AgeChartComponent,
    BreadcrumbComponent,
    SubjectTableComponent,
    FilterDialogComponent,
    MainComponent,
    HomePageComponent,
    FaqPageComponent,
    UserFormComponent,
    SearchDialogComponent,
    SpinnerComponent,
  ],
  entryComponents: [SearchDialogComponent],
  imports: [
    NgcCookieConsentModule.forRoot(cookieConfig),
    MatTooltipModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SliderModule,
    ToggleButtonModule,
    FieldsetModule,
    TooltipModule,
    DialogModule,
    ChartModule,
    MenubarModule,
    AccordionModule,
    ClipboardModule,
    SharedModule,
    TabViewModule,
    OverlayPanelModule,
    PerfectScrollbarModule,
    RouterModule.forRoot([])
  ],
  providers: [
    CategoryService,
    MenuListener,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
