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

    //#endregion
}