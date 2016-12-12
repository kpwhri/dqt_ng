import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Headers, Http} from '@angular/http';

import { AppComponent } from './app.component';
import {CategoryService} from "./app.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
