import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { map, Observable, Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class TaskService{
    
    private apiURL='https://api.demo.maydayservicios.com'
    constructor(private http: HttpClient){}


    getTask( status:string, order:string, token:string): Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);

        let parameters = {"status": status};
        const params = new HttpParams({ fromObject: parameters });

        return this.http.get<any>(`${this.apiURL}/v3/orders/${order}/task`,{headers:header, params:params})
    }

    getTaskDEV( status:string, order:string, token:string): Observable<any>{
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);

        let parameters = {"status": status};
        const params = new HttpParams({ fromObject: parameters });

        return this.http.get<any>(`v3/orders/${order}/task`,{headers:header, params:params})
    }

    postTask(kind:string, details:string, order:string, token:string){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);
        return this.http.post<any>(`${this.apiURL}/v3/orders/${order}/task`,{kind:kind, details:details},{headers:header}).pipe(
            (map((res:any)=>{
                return res;
            })))
    }

    postTaskDEV(kind:string, details:string, order:string, token:string){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json').set('token',token);

        return this.http.post<any>(`v3/orders/${order}/task`,{kind:kind, details:details},{headers:header}).pipe(
            (map((res:any)=>{
                return res;
            })))
    }

}