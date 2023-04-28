import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_service/token-storage-service/token-storage.service';
import { AuthenticationService } from '../_service/auth-service/authentication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NoSpace } from '../_helpers/validator';
import { UserModel } from '../Model/UserModel';
import { UserService } from '../_service/user-service/user.service';
// import {
//   SocialAuthService,
// } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  roles: string[] = [];
  public user: any = {};
  validForm!: FormGroup;
  // user: UserModel = new UserModel();
  isLoading: boolean = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private auth: AuthenticationService,
    private router: Router,
    private toast: NgToastService,
    private userSer: UserService,
  ) // private socialAuthService: SocialAuthService,
  { }

  ngOnInit(): void {
    // if(this.tokenStorage.getToken()){
    //   this.roles = this.tokenStorage.getUser().roles;
    // }
    this.validForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
    });
    // //this.soc
    this.user = {
      username: '',
      password: '',
    };
  }

  submitForm(): void {
    this.isLoading = true;
    this.auth.login(this.user).subscribe((data) => {
      this.isLoading = false;
      if (data.success) {
        this.tokenStorage.saveToken(data.data.token);
        this.tokenStorage.saveUser(data.data.username);
        this.tokenStorage.saveIdUser(data.data.id);
        const role = data.data.role[0].authority;
        console.log(role);
        this.toast.success({ summary: 'Đăng Nhập Thành Công', duration: 3000 });
        this.router.navigate(['/home']);
        console.log(data)
        console.log(data.data.name);
      } else {
        this.toast.error({ summary: 'Tài Khoản Hoặc Mật Khẩu Không Đúng', duration: 3000 });
      }
    });

  }
}
