import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoadingService } from "src/app/service/loading.service";

@Injectable({
    providedIn: 'root'
})

export class SpinnerInterceptor implements HttpInterceptor{
    constructor(private spinner: LoadingService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        return next.handle(req).pipe(
            finalize(()=> this.spinner.hide())
        )
    }
}