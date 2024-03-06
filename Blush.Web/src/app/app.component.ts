import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//
import { AccountService } from './_services/account.service';
import { SharedModule } from './_modules/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    HttpClientModule, 
    SharedModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Blush.Web';
  users: any;

  constructor(private http: HttpClient, private accountService: AccountService) {}
   
  ngOnInit() { 
    // this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    var user: any;
    if(localStorage.getItem('user') === undefined || localStorage.getItem('user') === null) {
      user = {};
      localStorage.setItem('user', '{}');
    }
    else {
      user = localStorage.getItem('user');
    }
    console.log("AppComponent, user = " + JSON.stringify(user));
    // const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    this.accountService.setCurrentUser(user);
  }

  // getUsers() {
  //   const usersApiUrl = "http://localhost:5045/api/users";
  //   this.http.get(usersApiUrl)
  //       .subscribe( response => {
  //         this.users = response;
  //         // console.log(this.users);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
}
