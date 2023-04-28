import { User } from 'src/app/common/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:8080/api/v1/auth";
  url2 = "http://localhost:8080/api/v1/management";

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post<User>(this.url + "/signup", user);
  }

  forgotPass(user: User) {
    return this.http.post<User>(this.url + "/forgot-password", user);
  }

  login(user: User) {
    return this.http.post<User>(this.url + "/login-jwt", user)
  }

  changePassword(user: User) {
    return this.http.post<User>(this.url + "/change-password", user);
  }

  getProfile(): Observable<any> {
    return this.http.get<User>(this.url2 + "/accounts");
  }

  updateProfile(user: User) {
    return this.http.put<User>(this.url2 + "/update/" + user.id, user)
  }

}
