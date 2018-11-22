import { Component, Input } from '@angular/core';
import { InfoCard } from "../../../models/InfoCard"


@Component({
    selector: 'info-card',
    templateUrl: './InfoCard.component.html',
    styleUrls: ['./InfoCard.component.less'],
})
export class InfoCardComponent { 
    @Input() public Data : InfoCard = null;

    public GetValueCompareClass(value : number) : string {
        if(this.Data.value > value)
            return "less";
        else if(this.Data.value < value)
            return "more";
        else
            return "equal";
    }

    public GetValueClass() : string{
        return "";
    }

}