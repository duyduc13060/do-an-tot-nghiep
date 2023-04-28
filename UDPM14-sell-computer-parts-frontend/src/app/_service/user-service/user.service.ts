import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/Model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:8080/api/v1/auth";
  url2 = "http://localhost:8080/api/v1/management";

  constructor(private http: HttpClient) { }

  createUser(user: UserModel) {
    return this.http.post<UserModel>(this.url + "/signup", user);
  }

  forgotPass(user: UserModel) {
    return this.http.post<UserModel>(this.url + "/forgot-password", user);
  }

  changePassword(user: UserModel): Observable<any> {
    return this.http.post(this.url + "/change-password", user);
  }

  getProfile(id: number): Observable<any> {
    return this.http.get(this.url2 + "/" + id);
  }

  update(id: number, user: any, file?: any): Observable<any>{

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fullname',user.fullname);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('address', user.address);

    return this.http.put(this.url2 + "/update/" + id, formData);
  }


}
