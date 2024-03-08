import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent implements OnInit{

  baseUrl = "http://localhost:5045/api/";
  validationErrors: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found')
        .subscribe(response => {
          console.log(response);
        }, error => {
          console.log(error);
        });
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request')
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      })
  }

  get500ServerError() {
    this.http.get(this.baseUrl + 'buggy/server-error')
        .subscribe(response => {
          console.log(response);
        }, error => {
          console.log(error);
        });
  }

  get401AuthError() {
    this.http.get(this.baseUrl + 'buggy/auth')
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  get400ValidationError() {
    this.http.post(this.baseUrl + 'account/register', {})
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
        this.validationErrors = error;
      });
  }


}
