import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, finalize } from 'rxjs';
import { BusyService } from '../_services/busy.service';


@Injectable()
export class loadingInterceptor implements HttpInterceptor {


	constructor(private busyService: BusyService) {
		console.log("Loading Interceptor's constructor");
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.busyService.busy();
		return next.handle(req).pipe(
			delay(1000),
			finalize(() => {
				this.busyService.idle();
			})
		)
	}
	 
}