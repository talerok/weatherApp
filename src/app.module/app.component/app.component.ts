import { Component } from '@angular/core';
import { InfoCard } from "../../models/InfoCard"

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent { 
    public Test : InfoCard = new InfoCard("Гусиноозерская ГЭС","ges","мВт",1000,900,800);
}