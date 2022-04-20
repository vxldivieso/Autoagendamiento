import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { changeProduct, changeService, dateProduct } from "../interfaces/changes.interface";
import { DetailOrder} from "../interfaces/detail.interface";
import {Services } from '../interfaces/detail.interface';

@Injectable({
    providedIn:'root'
})
export class DetailOrderService{
    private apiURL='http://localhost:3000';
    
    constructor(private http: HttpClient){

    }
    getDetailOrder():Observable<DetailOrder[]>{
        return this.http.get<DetailOrder[]>(`${this.apiURL}/detailsOrders`);
    }
}

@Injectable({
    providedIn:'root'
})
export class ModifyProductService{
    
    private apiURL='http://localhost:3030';

    constructor (private http : HttpClient){}

    postChangeProduct(data: changeProduct): Observable<changeProduct>{
        return this.http.post<changeProduct>(`${this.apiURL}/editProduct`, data );
    }

    getChangeProduct():Observable<changeProduct[]>{
        return this.http.get<changeProduct[]>(`${this.apiURL}/editProduct`);
    }

    
    
}
@Injectable({
    providedIn:'root'
})
export class ModifyService{

    private apiURL='http://localhost:3030';

    constructor (private http : HttpClient){}
    
    postChangeService(data: changeService): Observable<changeService>{
        return this.http.post<changeService>(`${this.apiURL}/editService`, data );
    }

    getChangeService():Observable<changeService[]>{
        return this.http.get<changeService[]>(`${this.apiURL}/editService`);
    }
}

@Injectable({
    providedIn:'root'
})

export class DateService{
    private apiURL='http://localhost:3030';

    constructor (private http : HttpClient){}
    postDateProduct(data: dateProduct): Observable<dateProduct>{
        return this.http.post<dateProduct>(`${this.apiURL}/dateProduct`, data );
    }

    getDateProduct():Observable<dateProduct[]>{
        return this.http.get<dateProduct[]>(`${this.apiURL}/dateProduct`);
    }

}