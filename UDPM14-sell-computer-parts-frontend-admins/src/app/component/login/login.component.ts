import { Router } from '@angular/router';
import { AuthenticationService } from './../../_service/auth-service/authentication.service';
import { TokenStorageService } from './../../_service/token-storage-service/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  roles: string[] = [];
  public user: any = {};

  constructor(
    private tokenStorage: TokenStorageService,
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private toast: NgToastService) {

  }

  ngOnInit(): void {
    this.user = {
      username: '',
      password: '',
    };
  }
  submitForm(): void {
    this.auth.login(this.user).subscribe((data) => {
      if (data.success) {
        if (data.data.role[0].authority === 'CUSTOMER') {
          this.toast.error({ summary: 'Tài khoản không có quyền truy cập', sticky: true });
        } else {
          console.log(data.data);

          this.tokenStorage.saveToken(data.data.token);
          this.tokenStorage.saveUser(data.data.name);
          this.tokenStorage.saveUser_id(data.data.id);
          const role = data.data.role[0].authority;
          this.tokenStorage.saveRole(role);
          console.log(role);
          console.log(this.tokenStorage.getUserRole());


          this.toast.success({summary: 'Đăng nhập thành công', duration: 3000});
          this.router.navigate(['/statistical']);
        }
      } else {
        this.toast.error({ summary: 'Thông tin đăng nhập không chính xác', sticky: true });
      }
    });
  }
}
