import { Component } from '@angular/core';

//---DI
import { IWeatherService,  cityInfo, weatherInfo } from '../../services/Interfaces/IWeatherService';
import { openWeatherService } from '../../services/openWeatherService';
//-----

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    providers: [
        {provide: IWeatherService, useClass: openWeatherService}
    ]
})
export class AppComponent { 
    constructor(private weatherService : IWeatherService) {}

    public SearchString : string = "";

    public Cities : cityInfo[] = [];

    public Weather : weatherInfo = null;

    public async LoadWeather(city: cityInfo){
        this.SearchString = city.name;
        this.Weather = await this.weatherService.load(city);
    }

    public async FindCity(str: string){
        this.Cities = await this.weatherService.find(str);
    }

}