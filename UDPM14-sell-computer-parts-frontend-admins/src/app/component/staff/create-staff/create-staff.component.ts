import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Staff } from 'src/app/_model/Staff';
import { StaffService } from 'src/app/_service/staff-service/staff.service';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css']
})
export class CreateStaffComponent implements OnInit {

  staff: Staff = new Staff();
  validForm!: FormGroup

  constructor(private router: Router, private staffSer: StaffService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.validForm = new FormGroup({
      'fullname': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]+$"), Validators.minLength(6), Validators.maxLength(20)]),
      'username': new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9_-]{5,16}$")]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
      'email': new FormControl(null, [Validators.required, Validators.pattern("^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$")]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern("(\\+84|0)([0-9]{9}|[0-9]{10})")]),
      "address": new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    });
  }

  createStaff() {
    this.staffSer.createStaff(this.staff)
    .subscribe(data => {
      this.toast.success({ summary: 'Thêm nhân viên ' + data.data.fullname + " thành công" , duration: 3000 });
      this.router.navigate(["list-staff"]);
    });
  }

}
