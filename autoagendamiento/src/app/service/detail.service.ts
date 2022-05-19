import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError} from "rxjs";
import { changeProduct, changeService, reagendar } from "../shared/components/detailOrder/interfaces/changes.interface";
import { RouterModule, Routes, Router } from '@angular/router';

@Injectable({
    providedIn:'root'
})
export class DetailOrderService{

    private apiURL='https://api.demo.maydayservicios.com'
    constructor(private http: HttpClient, private router: Router){
    }

    getOrderId(order : string, token:string){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        
        return this.http.get(`${this.apiURL}/v3/orders/`+order,{
            headers:header
        }).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            })
        )
    }
    
    putContact(data:any, order:string, token:string):Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);

        return this.http.put<any>(`${this.apiURL}/v3/orders/${order}/contact`,data,{headers:header}).pipe(
            (map((res:any)=>{
                return res;
            })))
    }

    getOrderDEV(order:string, token:string):Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        
        return this.http.get('v3/orders/'+order,{
            headers:header
        }).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            })
        )
    }
    
    putContactDEV(data:any, order:string, token:string):Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);

        return this.http.put<any>(`v3/orders/${order}/contact`,data,{headers:header}).pipe(
            (map((res:any)=>{
                return res;
            })))
    }

    errorHandler(error:HttpErrorResponse){
        if(error instanceof HttpErrorResponse){
            if(error.error instanceof ErrorEvent){
                console.log('Client Error');
            }else{
                console.log('Service Error');
                this.router.navigate(['error'])
            }
        }else{
            console.log('Other Type');
            
        }
        return throwError(error)
    }
}
@Injectable({
    providedIn:'root'
})

export class DateService{
    headers = new HttpHeaders();
    private apiURL='https://api.demo.maydayservicios.com'

    constructor (private http : HttpClient){}

    getOrderId(order:string, token:string){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        return this.http.get(`${this.apiURL}/v3/orders/`+order,{
            headers:header
        })
    } 

    putDateDelivery(data: string, order:string, token:string):Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);

        return this.http.put<any>(`${this.apiURL}/v3/orders/${order}/delivery_date`,data,{headers:header}).pipe(
            (map((res:any)=>{
                return res;
            })))
    }

    getOrderIdDEV(order:string, token:string){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        return this.http.get('v3/orders/'+order,{
            headers:header
        })
    } 

    putDateDeliveryDEV(data: string, order:number, token:string):Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);

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

    headers = new HttpHeaders();
    private apiURL ='https://api.demo.maydayservicios.com'

    constructor (private http : HttpClient){}
    //Modify Product 
    //GET request id 
    getRequest(order:string, token:string){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        return this.http.get(`${this.apiURL}/v3/orders/`+order,{
            headers:header
        })
    }
    //Put message request
    putRequest(data: string, request_id:number, token:string):Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);

        return this.http.put<any>(`${this.apiURL}/v3/requests/${request_id}/log`,{message:data},{headers:header}).pipe(
            (map((res:any)=>{
                return res;
            })))
    }
    //Put img Modify Product
    putRequestIMG(data: string, img:string, request_id:number, token:string):Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);

        return this.http.put<any>(`${this.apiURL}/v3/requests/${request_id}/log`,{message:data, attachment:img},{headers:header}).pipe(
            (map((res:any)=>{
                return res;
            })))
    }
    //Put img Modify Product DEV
    putRequestIMGDEV(data:string, img:string, request_id:number, token:string):Observable<any>{
        let header = new HttpHeaders()
        .set('content-type','application/json').set('token',token);

        return this.http.put<any>(`v3/requests/${request_id}/log`,{message:data, attachment:img},{headers:header}).pipe(
            (map((res:any)=>{
                return res;
            })))

    }
    //GET request message
    getRequestLog(request_id:number, token:string):Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);

        return this.http.get(`${this.apiURL}/v3/requests/${request_id}/log`,{
            headers:header
        })
    }
    
    //GET request id DEV
    getRequestDEV(order:string, token:string):Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        
        return this.http.get('v3/orders/'+order,{
            headers:header
        })
    }
    //GET request message DEV
    getRequestLogDEV(request_id:number, token:string):Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);

        return this.http.get(`/v3/requests/${request_id}/log`,{
            headers:header
        })
    }
    //Put message DEV
    putRequestDEV(data:string, request_id:number, token:string):Observable<any>{
        let header = new HttpHeaders()
        .set('content-type','application/json').set('token',token);

        return this.http.put<any>(`v3/requests/${request_id}/log`,{message:data},{headers:header}).pipe(
            (map((res:any)=>{
                return res;
            })))

    }
    
   
}
@Injectable({
    providedIn:'root'
})
export class ModifyContactData{

    constructor (private http : HttpClient){}
    getRequestsLogDEV(request_id:number, token:string): Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        
        return this.http.get(`v3/requests/${request_id}/log`,{
            headers:header
        })
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

    putReagendar(data: reagendar): Observable<reagendar>{
        return this.http.put<reagendar>(`${this.apiURL}/reagendar`, data );
    }

    getReagendar():Observable<reagendar[]>{
        return this.http.get<reagendar[]>(`${this.apiURL}/reagendar`);
    }
}