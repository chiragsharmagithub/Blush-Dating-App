import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map } from 'rxjs';
import { User } from '../Models/user';

// Services are injectible - Means we can inject our services into other services and components.
// Services are singleton - Means that the data stored inside a service doesn't get destroyed until our application is closed.  

// this code defines a service class that will be provided at the root level of the Angular application and shared across all components and services that inject it.

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "http://localhost:5045/api/";
  private currentUserSource = new ReplaySubject<User>(1);  // Keeps the last value forever
  currentUser$ = this.currentUserSource.asObservable();   // Expose as an observable so anyone can subscribe to it.

  constructor(private http: HttpClient) { 
    console.log("Value of currentUser$ = " + JSON.stringify(this.currentUser$));

  } 

  loginUser(model: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        localStorage.setItem('user', JSON.stringify(user));
        console.log("User has logged in.");
        console.log("User details = " + localStorage.getItem('user'));
        this.currentUserSource.next(user);
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next({
      username: '',
      token: ''
    });
  }
}
