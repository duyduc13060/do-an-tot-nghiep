import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-register',
  templateUrl: './email-register.component.html',
  styleUrls: ['./email-register.component.css']
})
export class EmailRegisterComponent implements OnInit {

  validForm!: FormGroup;
  email!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.validForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.pattern("^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$")]),
    });
  }

  emailRegister() {
    sessionStorage.setItem("email", this.email);
    this.router.navigate(["register"]);
  }

}
