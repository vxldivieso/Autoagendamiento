import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DetailOrder } from "../interfaces/detail.interface";

@Injectable({
    providedIn:'root'
})
export class DetailOrderService{
    private apiURL='http://localhost:3000/detailsOrders';
    
    constructor(private http: HttpClient){

    }
    getDetailOrder():Observable<DetailOrder[]>{
        return this.http.get<DetailOrder[]>(this.apiURL);
    }


}