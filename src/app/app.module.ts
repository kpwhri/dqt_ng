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
import {MatTooltipModule} from '@angular/material';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
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
  ],
  imports: [
    MatTooltipModule,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
