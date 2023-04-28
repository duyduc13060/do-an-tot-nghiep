import { User } from 'src/app/common/User';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage-service/token-storage.service';
import { NgToastService } from 'ng-angular-popup';


const AUTH_API = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLogin: any = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private toast: NgToastService
    ) { }


    login(user: User) :Observable<any>{
      return this.http.post(AUTH_API + '/api/v1/auth/login-jwt',user);
    }

    logout(){
      this.tokenStorageService.clearUser();
      window.location.reload();
      // this.toast.success({summary:'Đăng xuất thành công', duration:3000});
    }



}
