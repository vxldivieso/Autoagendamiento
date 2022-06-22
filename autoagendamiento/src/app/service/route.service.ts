import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class RouteService{
    private pathParamState = new BehaviorSubject<string | null>('');
    private pathParamStateToken = new BehaviorSubject<string | null>('');

    pathParam!: Observable<string | null>;
    pathParamToken!: Observable<string | null>;
    constructor(){
        this.pathParam = this.pathParamState.asObservable();
        this.pathParamToken = this.pathParamStateToken.asObservable();
    }

    updatePathParamState(newPathParam : string | null ){
        this.pathParamState.next(newPathParam);
    }

    updatePathParamStateToken(newPathParamToken : string | null ){
        this.pathParamStateToken.next(newPathParamToken)
    }
}