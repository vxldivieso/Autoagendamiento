import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, isDevMode } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { Observable } from "rxjs";
import { DateService } from "./detail.service";

export interface Agendamiento{
    date: string;
    block:string;
}
@Injectable({
    providedIn:'root'
})
export class SchedulingService{
    headers = new HttpHeaders();
    //params
    order!: number;
    token!: string;
  
    private apiURL='https://api.demo.maydayservicios.com'
    constructor(private http: HttpClient,
        private route : ActivatedRoute){
            this.order = this.route.snapshot.params['order'];
            this.token = this.route.snapshot.params['token'];
        }
    
    getSchedule(from:any, to:any,order:number, token:string): Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        let parameters = {"from":from,"to":to};
        //schedule?from=2022-06-01&to=2022-06-30
        const params = new HttpParams({ fromObject: parameters });

        return this.http.get(`${this.apiURL}/v3/orders/${order}/schedule`,{
            headers:header, params:params
        }) 
    }
    putSchedule(date:any, block:any, order:number, token:string):Observable<Agendamiento>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        return this.http.put<Agendamiento>(`${this.apiURL}/v3/orders/${order}/schedule`,{date,block},{headers:header})
    }
    
    getScheduleDEV(from:string, to:string, order:number, token:string): Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);

        let params = new HttpParams()
        .set('from', from)
        .set('to', to)

        return this.http.get(`v3/orders/${order}/schedule`,{
            params:params, headers:header, })
    }
    
    putScheduleDEV(date:any, block:any, order:number, token:string):Observable<Agendamiento>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        return this.http.put<Agendamiento>(`v3/orders/${order}/schedule`,{date,block},{headers:header})
    }
}