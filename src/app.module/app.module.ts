import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent }   from './app.component/app.component';
import {  WeatherComponent }   from './app.component/weather.component/weather.component';
import { InputDropdownComponent } from './app.component/inputDropdown.component/inputDropdown.component';
import { CityWeatherComponent } from './app.component/cityWeather.component/cityWeather.component';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule],
    declarations: [ AppComponent, WeatherComponent, InputDropdownComponent, CityWeatherComponent ],
    bootstrap:    [ AppComponent ],
})
export class AppModule { } 