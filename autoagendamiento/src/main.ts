import { enableProdMode, Injectable } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';
import { LoggerModule, NGXLogger } from "ngx-logger";

if (environment.production) {
  enableProdMode();
  window.console.log = () => {}
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
