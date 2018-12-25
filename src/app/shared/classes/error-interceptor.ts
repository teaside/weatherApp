import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
    ) {}
    private spinnerService: NgxSpinnerService;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).catch((err: any) => {
            if (err instanceof HttpErrorResponse && err.status === 404) {
                alert(`Не удаётся найти город`);
            }

            // rethrow so other error handlers may pick this up
            return Observable.throw(err);
        });
    }
}
