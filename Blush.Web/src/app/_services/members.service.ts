import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';
import { MemberEditComponent } from '../member-edit/member-edit.component';

const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJseW5kYSIsIm5iZiI6MTcxNjQ3NTY0MywiZXhwIjoxNzE3MDgwNDQzLCJpYXQiOjE3MTY0NzU2NDN9.N0pgDH_-quaWzWz3gyx2PirHGgVK5kEd5Dbx0IgyTzx25Quf65xWTrzEWCfNqnNixhJ9WaeDKKq2XownpPpUpw";
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
  members: Member[] = [];

  constructor(private http: HttpClient) {
    this.setAuthToHttpHeaders();
  }

  getMembers() {
    // 'of' operator helps return an Observable
    if(this.members.length > 0) return of(this.members);

    return this.http.get<Member[]>(this.baseApi + 'users', httpOptions).pipe(
      map(membersData => {
        this.members = membersData;
        return membersData;
      })
    )
  }

  getMemberByUsername(username: string) {
    const member = this.members.find(x => x.username === username);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(this.baseApi + 'users/' + username, httpOptions);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseApi + 'users', member, httpOptions).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
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
