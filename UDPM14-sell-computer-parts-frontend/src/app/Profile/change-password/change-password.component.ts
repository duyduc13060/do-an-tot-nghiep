import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserModel } from 'src/app/Model/UserModel';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';
import { UserService } from 'src/app/_service/user-service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: UserModel = new UserModel();
  validForm!: FormGroup;
  isLoading: boolean = false;

  constructor(private userSer: UserService, private router: Router, private toast: NgToastService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.validForm = new FormGroup({
      'passOld': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
      'passNew': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
      'passConfirm': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    });
  }

  getUsername() {
    return this.tokenStorage.getUser();
  }

  changePassword() {
    this.isLoading = true;
    if (this.user.passNew == this.user.passOld) {
      this.toast.warning({summary:"Mật Khẩu Mới Phải Khác Với Mật Khẩu Cũ", duration:3000});
    } else {
      if (this.user.passConfirm != this.user.passNew) {
        this.toast.warning({summary:"Mật Khẩu Nhập Lại Không Khớp", duration:3000});
      } else {
        this.user.username = this.tokenStorage.getUser();
        this.userSer.changePassword(this.user)
        .subscribe(data => {
          this.isLoading = false;
          this.user = data;
          this.toast.success({summary:"Đổi Mật Khẩu Thành Công", duration:3000});
          this.ngOnInit();
        }, error => this.toast.error({summary:"Đổi Mật Khẩu Thất Bại", sticky: true}));
      }
    }
  }

}
