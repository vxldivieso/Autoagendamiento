import { enableProdMode } from '@angular/core';
import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logging:{
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.DEBUG,
    serverLoggingUrl:'https://eqamw3vmyj.execute-api.us-east-1.amazonaws.com/default/maydayLogger',
    
  },
  
  
  
};


