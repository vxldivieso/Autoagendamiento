import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

interface Scheduling{
    bloque1: string;
    bloque2: string;
    bloque3: string;
    bloque4: string;

}

@Injectable({
    providedIn:'root'
})
export class SchedulingService{
    private apiURL='http://localhost:5000';
    
    constructor(private http: HttpClient){

    }
    getScheduling():Observable<Scheduling[]>{
        return this.http.get<Scheduling[]>(`${this.apiURL}/dates`);
    }


}