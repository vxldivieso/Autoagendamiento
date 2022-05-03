import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Agendamiento{
    date: string;
    block:string;
}
@Injectable({
    providedIn:'root'
})
export class SchedulingService{
    private apiURL='http://localhost:5000';
    
    constructor(private http: HttpClient){

    }
    getScheduling(): Observable<any>{
        return this.http.get<any>(`${this.apiURL}/scheduling`);
    }
    getSavedDate(){
        return this.http.get<any>(`${this.apiURL}/agendamiento`)
    }
    postAgendamiento(date:any, block:any): Observable<Agendamiento> {
        return this.http.post<Agendamiento>(`${this.apiURL}/agendamiento`, {date,block})
    }

}