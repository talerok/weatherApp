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

class SelectableArray<T>{
    private static _dafaultIndex = -1; 
    private _array : T[];
    private _selectedIndex : number;

    public Init(arr : T[]){
        this._array = arr;
        this._selectedIndex = SelectableArray._dafaultIndex;
    }

    public Get() : T[]{
        return this._array;
    }

    public Selected() : T{
        if(this._selectedIndex !== SelectableArray._dafaultIndex)
            return this._array[this._selectedIndex];
        else 
            return null;
    }

    public Next() : T{
        if(this._selectedIndex === SelectableArray._dafaultIndex){
            if(this._array.length > 0)
                this._selectedIndex = 0;
            else
                return null;
        }else this._selectedIndex++;
        if(this._selectedIndex >= this._array.length)
            this._selectedIndex = 0;
        
        return this._array[this._selectedIndex];
    }

    public Prev() : T{
        if(this._selectedIndex === SelectableArray._dafaultIndex){
            if(this._array.length > 0)
                this._selectedIndex = this._array.length - 1;
            else
                return null;
        }else this._selectedIndex--;
        if(this._selectedIndex < 0)
            this._selectedIndex = this._array.length - 1;
        
        return this._array[this._selectedIndex];
    }


    public Select(obj : T) : boolean {
        let fObj = null;
        for(let i = 0; i < this._array.length; i++)
            if(this._array[i] === obj){
                fObj = this._array[i];
                this._selectedIndex = i;
                break;
            }
        
        return fObj !== null;
    }

    constructor(){
        this.Init([]);
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
    public IsHideFoundCities : boolean = true;

    public Weather : weatherInfo = null;

    public FoundCities : SelectableArray<cityInfo> = new SelectableArray<cityInfo>();

    public HideFoundCities(hide : boolean){
        this.IsHideFoundCities = hide;
    }

    private _mRequests = new MultipleRequests<cityInfo[]>(
        function(cities : cityInfo[]){
            this.FoundCities.Init(cities);
            if(cities.length > 0)
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

    public onInputPressEnter(){ 
        if(this.IsHideFoundCities)
            this.HideFoundCities(false);  
        else
            this.SelectCity(this.FoundCities.Selected(), null);
    }

    private _selectCity(city: cityInfo){
        if(city && this.FoundCities.Select(city))
            this.SearchString = city.name;
    }

    public async LoadSelectedCityWeather(){
        this.Weather = null;
        let city = this.FoundCities.Selected();
        if(!city)
            return;
        this.Weather = await this.weatherService.load(city);
    }

    public SelectCity(city: cityInfo, event : any){
        if(event)
            event.stopPropagation();
        this._selectCity(city);
        this.LoadSelectedCityWeather();
        this.HideFoundCities(true);
    }

    public FormatTemp(temp : number) : string{
        return temp > 0 ? "+" + temp.toFixed(1) : temp.toFixed(1).toString();
    }

    public FormatClouds(pr: number) : string{
        if(pr <= 30)
            return "Ясно";
        if(pr <= 60)
            return "Переменная облачность";
        if(pr <= 70)
            return "Облачно с прояснениями";
        return "Пасмурно";
    }
    
    public FormatCloudsIco(pr: number) : string{
        if(pr <= 30)
            return "sun-ico";
        if(pr <= 60)
            return "sun-cloud-ico";
        if(pr <= 70)
            return "cloud-ico";
        return "clouds-ico";
    }

    public FormatWindDirection(ang : number){
        if(ang >= 330 || ang < 30)
            return "С";
        if(ang >= 30 || ang < 60)
            return "СВ";
        if(ang >= 60 || ang < 120)
            return "В";
        if(ang >= 120 || ang < 150)
            return "ЮВ";
        if(ang >= 150 || ang < 210)
            return "Ю";
        if(ang >= 210 || ang < 240)
            return "ЮЗ"; 
        if(ang >= 240 || ang < 300)
            return "З";
        if(ang >= 300 || ang < 330)
            return "СЗ";
    }

}