import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent }   from './app.component/app.component';
import {  WeatherComponent }   from './app.component/weather.component/weather.component';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule],
    declarations: [ AppComponent, WeatherComponent ],
    bootstrap:    [ AppComponent ],
})
export class AppModule { } 