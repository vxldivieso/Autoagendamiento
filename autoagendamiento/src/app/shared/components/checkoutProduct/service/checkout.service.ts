import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Checkout{
    id: number;
    checkout: boolean;
}

@Injectable({
    providedIn:'root'
})

export class CheckoutService{
    private apiURL='http://localhost:4040';
    constructor(private http: HttpClient){

    }

    getCheckout():Observable<any>{
        return this.http.get<any>(`${this.apiURL}/checkout`);
    }
    postCheckout(value:any): Observable<Checkout>{
        return this.http.post<Checkout>(`${this.apiURL}/checkout`, {value})
    }
}