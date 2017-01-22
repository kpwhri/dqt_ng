import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {CategoryService} from "./app.service";
import { GraphComponent } from './graph/graph.component';
import { ChartComponent } from './chart/chart.component';
import { BarGraphDirective } from './bar-graph.directive';
import { BarchartComponent } from './barchart/barchart.component';
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

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ChartComponent,
    BarGraphDirective,
    BarchartComponent,
    CheckboxValueComponent,
    CategoryMasterComponent,
    CategoryComponent,
    ItemComponent,
    ValueComponent,
    AgeChartComponent,
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
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
