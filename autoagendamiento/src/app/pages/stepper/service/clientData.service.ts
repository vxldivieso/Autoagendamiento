import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClientData } from "../interfaces/clientData.interface";

@Injectable({
    providedIn:'root'
})
export class ClientDataService{
    private apiURL='http://localhost:3000/orders';
    
    constructor(private http: HttpClient){

    }
    getClientData():Observable<ClientData[]>{
        return this.http.get<ClientData[]>(this.apiURL);
    }


}