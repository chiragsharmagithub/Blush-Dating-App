import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

	constructor(private accountService: AccountService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {

		let currentUser: User;

		this.accountService.currentUser$
			.pipe(take(1))
			.subscribe((user) => {
				if(user) {
					const token = currentUser.token;
					req = req.clone({
						headers: req.headers.set('Authorization', `Bearer ${token}`)
					});
				}
				else {
					// req = req.clone({
					// 	headers: req.headers.set('Authorization', 'Bearer sample-token')
					// });
				}
			});


		return next.handle(req);
	}
}

