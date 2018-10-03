import { Component, Input, Output, EventEmitter } from '@angular/core';

//---DI
import { cityInfo, weatherInfo } from '../../../services/Interfaces/IWeatherService';

@Component({
    selector: 'city-weather',
    templateUrl: './cityWeather.component.html',
    styleUrls: ['./cityWeather.component.less'],
})
export class CityWeatherComponent { 

   
    @Input() public Weather : weatherInfo = null;
    @Input() public City : cityInfo;
    @Input() public Show : boolean;
    @Output() public onRefresh : EventEmitter<void> = new EventEmitter<void>();
    //#region Formating

    public Refresh(){
        if(this.City != null)
            this.onRefresh.emit();
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
    //27.5
    public FormatWindDirection(ang : number){
        if(ang >= 342.5 || ang < 27.5)
            return "С";
        if(ang >= 27.5 && ang < 72.5)
            return "СВ";
        if(ang >= 72.5 && ang < 117.5)
            return "В";
        if(ang >= 117.5 && ang < 162.5)
            return "ЮВ";
        if(ang >= 162.5 && ang < 207.5)
            return "Ю";
        if(ang >= 207.5 && ang < 252.5)
            return "ЮЗ"; 
        if(ang >= 252.5 && ang < 297.5)
            return "З";
        if(ang >= 297.5 && ang < 342.5)
            return "СЗ";
    }

    //#endregion
}