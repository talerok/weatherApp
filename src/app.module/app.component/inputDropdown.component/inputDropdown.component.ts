import { Component, Input, Output, HostListener, ElementRef, EventEmitter } from '@angular/core';

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

//вспом. класс
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

export class InputDropdownSettings{
    constructor(public readonly GetPromise : any, public readonly GetElemInfo : any, public readonly PlaceHolder: string){

    }
}

@Component({
    selector: 'input-dropdown',
    templateUrl: './inputDropdown.component.html',
    styleUrls: ['./inputDropdown.component.less'],
})
export class InputDropdownComponent { 
    public InputString : string = "";
    
    @Input() public Settings : InputDropdownSettings;
    @Output() public onChanged = new EventEmitter<any>();
    @Output() public onFocusChanged = new EventEmitter<boolean>();

    constructor(private _elementRef : ElementRef) {}

    public Elements : SelectableArray<any> = new SelectableArray<any>();
    public ChoosenElem : any;


    public MultipleRequests : MultipleRequests<any> = new MultipleRequests<any>(function(elems : any[]){ 
        this.Elements.Init(elems);
    }.bind(this),[])

    public onInputChange(str: string){
        this.MultipleRequests.Get(this.Settings.GetPromise(str) as Promise<any>);
    }

    private _getInput() : any{
        return this._elementRef.nativeElement.getElementsByTagName("input")[0];
    }

    private _blur(){
        this._getInput().blur();
    }

    public onFocusChange(on : boolean){
        this.onFocusChanged.emit(on);

        if(!on){
            this.MultipleRequests.Reset();
            this.InputString = this.ChoosenElem ? this.Settings.GetElemInfo(this.ChoosenElem) : "";
        }else{
            this.onInputChange(this.InputString);
        }

    }

    public onChoseElement(elem: any, event : any){
        if(!elem)
            return;

        this.ChoosenElem = elem;
        this.onChanged.emit(elem);
        this._blur();
    }

    public onInputKeyDownArrow(up : boolean){
        if(up)
            this.Elements.Prev()
        else
            this.Elements.Next();
        if(this.Elements.Selected())
            this.InputString = this.Settings.GetElemInfo(this.Elements.Selected());
    }

}