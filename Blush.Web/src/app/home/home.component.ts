import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  registerMode: boolean = false;
  users: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    this.http.get("http://localhost:5045/api/users")
        .subscribe(response => {
          this.users = response;
          console.log("Users = " + JSON.stringify(this.users));
        }, error => {
          console.log(error);
        });
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
