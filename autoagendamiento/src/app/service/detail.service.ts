import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable} from "rxjs";
import { changeProduct, changeService, reagendar } from "../shared/components/detailOrder/interfaces/changes.interface";

@Injectable({
    providedIn:'root'
})
export class DetailOrderService{
    constructor(private http: HttpClient){
    }

    getOrderId(order:number, token:string){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        
        return this.http.get('v3/orders/'+order,{
            headers:header
        })
    } 

    putContact(data:any, order:number, token:string):Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);

        return this.http.put<any>(`v3/orders/${order}/contact`,data,{headers:header}).pipe(
            (map((res:any)=>{
                return res;
            })))
    }
}
@Injectable({
    providedIn:'root'
})

export class DateService{
    headers = new HttpHeaders();
    constructor (private http : HttpClient){}

    getOrderId(order:number, token:string){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        return this.http.get('v3/orders/'+order,{
            headers:header
        })
    } 

    putDateDelivery(data: string, order:number, token:string):Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);

        console.log(data);
        
        return this.http.put<any>(`v3/orders/${order}/delivery_date`,data,{headers:header}).pipe(
            (map((res:any)=>{
                return res;
            })))
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
}

@Injectable({
    providedIn:'root'
})
export class ReagendarService{
    private apiURL='http://localhost:3030';
    constructor (private http : HttpClient){}
    postReagendar(data: reagendar): Observable<reagendar>{
        return this.http.post<reagendar>(`${this.apiURL}/reagendar`, data );
    }

    getReagendar():Observable<reagendar[]>{
        return this.http.get<reagendar[]>(`${this.apiURL}/reagendar`);
    }
}