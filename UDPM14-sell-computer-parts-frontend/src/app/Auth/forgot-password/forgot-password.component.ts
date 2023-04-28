import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/Model/UserModel';
import { UserService } from 'src/app/_service/user-service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  user: UserModel = new UserModel();
  validForm!: FormGroup;
  isLoading: boolean = false;

  constructor(private router: Router, private userSer: UserService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.validForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.pattern("^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$")]),
    });
  }

  forgotPassword() {
    this.isLoading = true;
     this.userSer.forgotPass(this.user)
    .subscribe(res => {
      this.isLoading = false;
      this.toast.success({summary:'Kiểm tra email của bạn để lấy mật khẩu mới <3', duration:3000});
      this.router.navigate(['login']);
    }, error => this.toast.error({summary:'Lấy lại mật khẩu thất bại!', sticky:true}));
  }
}
