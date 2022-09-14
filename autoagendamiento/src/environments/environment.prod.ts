import { enableProdMode } from '@angular/core';
import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logging:{
    level: NgxLoggerLevel.OFF,
    serverLogLevel: NgxLoggerLevel.DEBUG,
    //prod 
    serverLoggingUrl:'https://eqamw3vmyj.execute-api.us-east-1.amazonaws.com/default/maydayLogger',

    //demo serverLoggingUrl:'https://nehwwhwmpd.execute-api.us-east-1.amazonaws.com/default/ngxLogger'
    
  },
};


