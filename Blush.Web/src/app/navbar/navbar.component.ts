import { Component, OnInit } from '@angular/core';
import { FormsModule, UntypedFormBuilder } from '@angular/forms';
import { AccountService } from '../Services/account.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  
  model: any = {};
  userLoggedIn: boolean = false;

  constructor(private accountService: AccountService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login() {
    this.accountService.loginUser(this.model)
        .subscribe(response => {
          console.log(response);
          this.userLoggedIn = true;
        }, error => {
          console.log(error);
        });
  }

  logout() {
    this.accountService.logout();
    this.userLoggedIn = false;
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe(user => { 
      // If the user object has no key-value pairs, then there is no user logged in.
      this.userLoggedIn = Object.keys(user).length !== 0;
      console.log("Test: value of userLoggedIn = " + this.userLoggedIn);
      console.log("Keys of user object = " + Object.keys(user));
      console.log("Username = " + user.username);
      this.model = user;
    }, error => {
      console.log("Error getting current user");
      console.log(error);
    })
  }
}
