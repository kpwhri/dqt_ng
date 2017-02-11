import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import {CategoryService} from "./app.service";
import { SliderModule } from 'primeng/primeng';
import {ToggleButtonModule} from 'primeng/primeng';
import { CheckboxValueComponent } from './checkbox-value/checkbox-value.component';
import { CategoryMasterComponent } from './category-master/category-master.component';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import {TooltipModule} from "primeng/components/tooltip/tooltip";
import {FieldsetModule} from "primeng/components/fieldset/fieldset";
import { ValueComponent } from './value/value.component';
import {DialogModule} from "primeng/components/dialog/dialog";
import { AgeChartComponent } from './age-chart/age-chart.component';
import {ChartModule} from "primeng/components/chart/chart";
import { EnrollChartComponent } from './enroll-chart/enroll-chart.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {MenubarModule} from "primeng/components/menubar/menubar";
import {RouterModule} from "@angular/router";
import {MenuListener} from "./menuListener";
import {AccordionModule} from "primeng/components/accordion/accordion";
import {PerfectScrollbarModule, PerfectScrollbarConfigInterface} from "angular2-perfect-scrollbar";
import { SubjectTableComponent } from './subject-table/subject-table.component';


const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
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
    EnrollChartComponent,
    BreadcrumbComponent,
    SubjectTableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SliderModule,
    ToggleButtonModule,
    FieldsetModule,
    TooltipModule,
    DialogModule,
    ChartModule,
    MenubarModule,
    AccordionModule,
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    RouterModule.forRoot([]),
  ],
  providers: [CategoryService, MenuListener],
  bootstrap: [AppComponent]
})
export class AppModule {

}
