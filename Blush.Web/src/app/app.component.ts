import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { User } from './Models/user';
import { AccountService } from './Services/account.service';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, NavbarComponent, HomeComponent],
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
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
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
