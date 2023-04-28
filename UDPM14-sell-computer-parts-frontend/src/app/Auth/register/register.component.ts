import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/Model/UserModel';
import { UserService } from 'src/app/_service/user-service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserModel = new UserModel();
  pass!: string;
  validForm!: FormGroup;
  isLoading: boolean = false;

  constructor(private userSer: UserService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.validForm = new FormGroup({
      'fullname': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$"), Validators.minLength(5), Validators.maxLength(20)]),
      'username': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]+$"), Validators.minLength(6), Validators.maxLength(20)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
      'pass': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    });
  }

  register() {
    this.isLoading = true;
    if (this.pass != this.user.password) {
      this.toast.warning({summary:'Mật khẩu nhập lại không giống với mật khẩu đã nhập!',duration:3000});
    } else {
      this.user.email = String(sessionStorage.getItem("email"));
      this.userSer.createUser(this.user)
      .subscribe(res => {
        this.isLoading = false;
        this.toast.success({summary:'Đăng Ký Thành Công!', duration:3000});
        sessionStorage.removeItem("email");
        this.router.navigate(["login"]);
      }, error => this.toast.error({summary:'Đăng ký Thất Bại :((!',sticky:true}));
    }
  }

  comeBack() {
    sessionStorage.removeItem("email");
    this.router.navigate(["/emailRegister"])
  }

}
