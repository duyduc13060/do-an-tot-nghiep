import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/_model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url_user='http://localhost:8080/api/v1/user';
  url = 'http://localhost:8080/api/v1/management';
  url_auth='http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {}

  getAllUser(): Observable<any>{
    return this.http.get(this.url + "/accounts");
  }
  getAllUser_review(id:number): Observable<any>{
    return this.http.get(this.url + "/accounts");
  }
  createUser(user: UserModel) {
    return this.http.post<UserModel>(this.url_auth + "/signup", user);
  }

  forgotPass(user: UserModel) {
    return this.http.post<UserModel>(this.url_auth + "/forgot-password", user);
  }

  changePassword(user: UserModel): Observable<any> {
    return this.http.post(this.url_auth + "/change-password", user);
  }

  getProfile(id: number): Observable<any> {
    return this.http.get(this.url + "/" + id);
  }

  update(id: number, user: any, file?: any): Observable<any>{

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fullname',user.fullname);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('address', user.address);

    return this.http.put(this.url + "/update/" + id, formData);
  }

}
