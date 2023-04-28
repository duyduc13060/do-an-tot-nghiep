import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { NgToastService } from 'ng-angular-popup';
import { Staff } from 'src/app/_model/Staff';
import { StaffService } from 'src/app/_service/staff-service/staff.service';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.css']
})
export class UpdateStaffComponent implements OnInit {

  staff: Staff = new Staff();
  validForm!: FormGroup

  constructor(private router: Router, private staffSer: StaffService, private toast: NgToastService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.validForm = new FormGroup({
      'fullname': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]+$"), Validators.minLength(6), Validators.maxLength(20)]),
      'username': new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9_-]{5,16}$")]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
      'email': new FormControl(null, [Validators.required, Validators.pattern("^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$")]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern("(\\+84|0)([0-9]{9}|[0-9]{10})")]),
      "address": new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    });

    this.getStaffById();
  }

  getStaffById() {
    let id = +this.activatedRoute.snapshot.params['id'];
    this.staffSer.getAllStaffById(id)
    .subscribe(data => {
      this.staff = data.data;
    })
  }

  updateStaff() {

  }

  reset() {
    this.staff.fullname = "";
    this.staff.username = "";
    this.staff.email = "";
    this.staff.password = "";
    this.staff.phone = "";
    this.staff.address = ""
  }

}
