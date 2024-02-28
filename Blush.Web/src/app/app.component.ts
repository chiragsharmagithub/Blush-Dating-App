import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Blush.Web';
  users: any;

  constructor(private http: HttpClient) {}
   
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    const usersApiUrl = "http://localhost:5045/api/users";
    this.http.get(usersApiUrl)
        .subscribe( response => {
          this.users = response;
          console.log(this.users);
        },
        error => {
          console.log(error);
        });
  }
}
