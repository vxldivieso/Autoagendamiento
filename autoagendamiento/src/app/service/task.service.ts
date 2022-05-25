import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class TaskService{
    productModify : boolean = false;
    serviceModify : boolean = false;
    private apiURL='https://api.demo.maydayservicios.com'
    constructor(private http: HttpClient){
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