import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INGXLoggerConfig, INGXLoggerMetadata, NgxLoggerLevel, NGXLoggerRulesService, NGXLoggerServerService } from 'ngx-logger';
import { Observable } from 'rxjs';
import { RouteService } from './route.service';

@Injectable({
    providedIn:'root'
})
export class RulesCustomisedService extends NGXLoggerRulesService {
  /** If true the logger will send logs to server */
  override shouldCallServer(level: NgxLoggerLevel, config: INGXLoggerConfig, message?: any | (() => any), additional?: any[]): boolean {
    return (message && typeof message === 'string');
  }
}


@Injectable({
    providedIn:'root'
})
export class ServerCustomisedService extends NGXLoggerServerService{
  
  order:any;
  token:any;
  pathParam !: Observable<string | null>
  pathParamToken !: Observable<string | null>
  constructor(httpBackend : HttpBackend, private service : RouteService){
    super(httpBackend)
    //params nonroute
    this.pathParam = this.service.pathParam;
    this.pathParam.subscribe(res=>{
      this.order = res
    })

    this.pathParamToken = this.service.pathParamToken;
    this.pathParamToken.subscribe(res=>{
      this.token = res
      
    })
  }
  public override customiseRequestBody(metadata: INGXLoggerMetadata): any {
    let body = { ...metadata };
    body['additional'] = [this.order]
    return body;
  }
}