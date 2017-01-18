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
import {PanelModule} from "primeng/primeng";
import { CategoryMasterComponent } from './category-master/category-master.component';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import {TooltipModule} from "primeng/components/tooltip/tooltip";

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SliderModule,
    ToggleButtonModule,
    PanelModule,
    TooltipModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
