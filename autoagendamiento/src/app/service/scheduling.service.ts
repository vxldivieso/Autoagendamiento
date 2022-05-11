import { HttpClient, HttpHeaders } from "@angular/common/http";
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
    headers = new HttpHeaders();

    private apiURL='https://api.demo.maydayservicios.com'
    constructor(private http: HttpClient){}

    getSchedule(order:number, token:string): Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        return this.http.get(`${this.apiURL}/v3/orders/${order}/schedule`,{
            headers:header
        }) 
    }
    putSchedule(date:any, block:any, order:number, token:string):Observable<Agendamiento>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        return this.http.put<Agendamiento>(`${this.apiURL}/v3/orders/${order}/schedule`,{date,block},{headers:header})
    }

    getScheduleDEV(order:number, token:string): Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        return this.http.get(`v3/orders/${order}/schedule`,{
            headers:header
        })
    }
    putScheduleDEV(date:any, block:any, order:number, token:string):Observable<Agendamiento>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        return this.http.put<Agendamiento>(`v3/orders/${order}/schedule`,{date,block},{headers:header})
    }
}