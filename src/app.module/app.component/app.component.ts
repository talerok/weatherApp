import { Component } from '@angular/core';

//---DI
import { IWeatherService,  cityInfo, weatherInfo } from '../../services/Interfaces/IWeatherService';
import { openWeatherService } from '../../services/openWeatherService';
//-----

//чтобы при множестве запросов, срабатывал только посл.
class MultipleRequests<T>{
    private _requests : number = 0;

    //в typescript нет делегатов :/
    constructor(private _delegate : any, private _defaultValue : T) { }

    public Reset(){
        this._requests = 0;
        if(this._defaultValue)
            this._delegate(this._defaultValue);
    }

    public InProgress() : boolean{
        return this._requests !== 0;
    }

    public async Get(promise : Promise<T>){
        this._requests++;
        let res = await promise;
        if(this._requests === 1)
            this._delegate(res)
        if(this._requests !== 0)
            this._requests--;
    }

}

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
    public FoundCities : cityInfo[] = [];
    public IsHideFoundCities : boolean = true;


    public SelectedCity : cityInfo = null;
    public Weather : weatherInfo = null;

    public HideFoundCities(hide : boolean){
        this.IsHideFoundCities = hide;
    }

    private _mRequests = new MultipleRequests<cityInfo[]>(
        function(cities : cityInfo[]){
            this.FoundCities = cities;
            if(this.FoundCities.length > 0)
                this.HideFoundCities(false);   
            else
                this.HideFoundCities(true);   
        }.bind(this),
        []
    );

    public async onInputChange(value : string) {
        if(value.length < 3){
            this._mRequests.Reset();
        }
        else
            this._mRequests.Get(this.weatherService.find(value));
    } 

    public onInputClick(event : any){
        event.stopPropagation();
        this.HideFoundCities(false);
    } 

    private _selectCity(city: cityInfo){
        this.SearchString = city.name;
        this.SelectedCity = city;
    }

    public async LoadSelectedCityWeather(){
        this.Weather = null;
        this.Weather = await this.weatherService.load(this.SelectedCity);
    }

    public SelectCity(event : any, city: cityInfo){
        event.stopPropagation();
        this._selectCity(city);
        this.LoadSelectedCityWeather();
        this.HideFoundCities(true);
    }

}