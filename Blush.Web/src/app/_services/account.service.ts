import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, ReplaySubject, map } from 'rxjs';
import { User } from '../_models/user';

// Services are injectible - Means we can inject our services into other services and components.
// Services are singleton - Means that the data stored inside a service doesn't get destroyed until our application is closed.  

// this code defines a service class that will be provided at the root level of the Angular application and shared across all components and services that inject it.

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit {
  baseUrl = "http://localhost:5045/api/";
  private currentUserSource = new ReplaySubject<User>(1);  // Keeps the last value forever
  currentUser$ = this.currentUserSource.asObservable();   // Expose as an observable so anyone can subscribe to it.

  constructor(private http: HttpClient) { 
    
  }  

  ngOnInit(): void {
    console.log("Value of currentUser$ = " + JSON.stringify(this.currentUser$));
  }

  
  loginUser(model: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        // return response;
      })
    );
  }

  // Once a user is registered, we will consider him to be loggedin.
  registerUser(model: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        // return user;
      })
    )
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
