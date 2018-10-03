import { Component } from '@angular/core';
import { InputDropdownSettings } from '../inputDropdown.component/inputDropdown.component';
//---DI
import { IWeatherService,  cityInfo, weatherInfo } from '../../../services/Interfaces/IWeatherService';
import { openWeatherService } from '../../../services/openWeatherService';
//-----

@Component({
    selector: 'weather',
    templateUrl: './weather.component.html',
    providers: [
        {provide: IWeatherService, useClass: openWeatherService}
    ]
})
export class WeatherComponent { 

    constructor(private _weatherService : IWeatherService) {}

    public SelectedCityWeather : weatherInfo = null;
    public SelectedCity : cityInfo = null;
    public ShowWeather = true;

    private _findCities(str : string) : Promise<cityInfo[]>{
        if(str.length < 3)
            return  new Promise((resolve, reject) => {
                resolve([]);
            })
        return this._weatherService.find(str);
    }

    public DropDownSettings : InputDropdownSettings = new InputDropdownSettings(
        this._findCities.bind(this), 
        function(city : cityInfo) : string{
            return city.description;
        },
        "Введите название населенного пункта"
    );
    
    public async onSelect(city : cityInfo){
        this.SelectedCity = city;
        this.SelectedCityWeather = null;
        this.SelectedCityWeather = await this._weatherService.load(city);
    }

    public async onRefresh(){
        this.SelectedCityWeather = null;
        this.SelectedCityWeather = await this._weatherService.load(this.SelectedCity);
    }

    public onFocusChanged(on: boolean){
        this.ShowWeather = !on;
    }

}