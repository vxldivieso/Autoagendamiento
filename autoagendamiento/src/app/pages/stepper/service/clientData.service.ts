import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { clientData } from "../interfaces/clientData.interface";

@Injectable({
    providedIn:'root'
})
export class ClientDataService{
    private apiURL='http://localhost:3000/clientData';


    constructor(private http: HttpClient){

    }
    getClientData():Observable<any>{
        return this.http.get<clientData[]>(this.apiURL);
    }


}