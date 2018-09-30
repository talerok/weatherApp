import { Injectable } from '@angular/core';

export class windInfo{
    constructor(
        readonly speed: number,
         readonly degree: number
         ){ }
}

export class cityInfo{
    constructor( 
        readonly xCord: number, 
        readonly yCord: number,
        readonly name: string,
        readonly description: string
        ){}
}

export class weatherInfo{
    constructor(
        readonly temperture: number,
        readonly pressure: number,
        readonly humidity: number,
        readonly clouds: number,
        readonly windInfo: windInfo
        ){}
}

//ибо angular не поддерживает DI через интерфейсы, только через абстр. классы
@Injectable()
export abstract class IWeatherService{
    abstract async load(city: cityInfo) : Promise<weatherInfo>;
    abstract async find(city: string) : Promise<cityInfo[]>;
}