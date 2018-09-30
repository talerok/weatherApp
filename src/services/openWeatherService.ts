import './Interfaces/IWeatherService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IWeatherService, cityInfo, weatherInfo, windInfo } from './Interfaces/IWeatherService';

@Injectable()
export class openWeatherService implements IWeatherService {

    constructor(private _http : HttpClient) {}

    private _apiKey : string = "821a41b454f613f331405e2a54d1acea";

    private _getFindUrl(city: string) : string {
        return "https://geocode-maps.yandex.ru/1.x/?format=json&kind=locality&geocode=" + city;
    }

    private _getLoadUrl(x: number, y: number) : string {
        return "http://api.openweathermap.org/data/2.5/weather?lon=" + x + "&lat=" + y + "&appid=" + this._apiKey;
    }

    private _getNumbers(str : string) : number[]{
        let regex = /[+-]?\d+(\.\d+)?/g;
        return str.match(regex).map(function(elem){
            return Number(elem);
        })
    }

    private _getFindData(object : any) : any[] {
        return (object.response.GeoObjectCollection.featureMember as any[]).map(function(elem){
            return elem.GeoObject;
        });
    }

    private _toCityInfo(info: any) : cityInfo{
        let coords : number[] = this._getNumbers(info.Point.pos);
        let xCord : number = coords[0];
        let yCord : number = coords[1];
        let description : string = info.metaDataProperty.GeocoderMetaData.text;
        let name: string = info.name;
        return new cityInfo(xCord, yCord, name, description);
    }

    private _getWeather(info: any) : weatherInfo {
        return new weatherInfo(
            info.main.temp - 273.15,
            info.main.pressure,
            info.main.humidity,
            info.clouds.all,
            new windInfo(
                info.wind.speed,
                info.wind.deg
                )
        );
    }

    async load(city: cityInfo) : Promise<weatherInfo> {
        try{
            let that = this;
            let info = await this._http.get(this._getLoadUrl(city.xCord, city.yCord)).toPromise();
            return that._getWeather(info);
        }catch{
            return null;
        }
    }

    async find(city: string) : Promise<cityInfo[]>{
        try{
            let that = this;
            let info = await this._http.get(this._getFindUrl(city)).toPromise();
            return this._getFindData(info).map(function(city : any){ 
                return that._toCityInfo(city);
            });
        }catch{
            return [];
        }
    }
}