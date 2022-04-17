import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Scheduling } from "../interfaces/scheduling.interface";

@Injectable({
    providedIn:'root'
})

export class SchedulingService{
    constructor(private http: HttpClient){

    }

    public getScheduling(): Observable<any>{
        return this.http.get("http://localhost:5000/")
    }
}