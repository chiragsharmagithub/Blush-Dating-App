import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../_models/member';

const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjaGFybGVzIiwibmJmIjoxNzE1ODAzNzM4LCJleHAiOjE3MTY0MDg1MzgsImlhdCI6MTcxNTgwMzczOH0.XRqCBHToDCqXEKm9sdmWZCoVaJRjrksHWfsO2n5XpX-MhGx7eQsR3men6iUX_Oaf8mpFqlaloNHq2J0pr4nzGg";
const httpOptions = {
	headers: new HttpHeaders({
	  Authorization: 'Bearer ' + token
	})
}

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseApi = environment.apiUrl;
  httpOptions: any;

  constructor(private http: HttpClient) {
    this.setAuthToHttpHeaders();
  }

  getMembers() {
    return this.http.get<Member[]>(this.baseApi + 'users', httpOptions);
  }

  getMemberByUsername(username: string) {
    return this.http.get<Member>(this.baseApi + 'users/' + username, httpOptions);
  }

  setAuthToHttpHeaders() {
    const token = this.getAuthBearerToken();
      this.httpOptions = {
        headers : new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      };
  }

  getAuthBearerToken() {
    let user = localStorage.getItem('user');
    let token : string = "";
    if(user != null) {
      let userJson = JSON.parse(user);
      token = userJson.token;
    }
    return token;
  }
}
