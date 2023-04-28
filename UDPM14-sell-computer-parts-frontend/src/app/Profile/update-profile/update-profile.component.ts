import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/Model/UserModel';
import { NgToastService } from 'ng-angular-popup';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';
import { UserService } from 'src/app/_service/user-service/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  isLoading: boolean = true;
  user: UserModel = new UserModel();

  id!: number;
  selectedFiles?: FileList;
  currentFile?: File;
  preview = '';

  userFormEdit = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.pattern("^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$")]),
    'fullname': new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z ]+$"), Validators.minLength(5), Validators.maxLength(20)]),
    'phone': new FormControl('', [Validators.required, Validators.pattern("(\\+84|0)([0-9]{9}|[0-9]{10})")]),
    'address': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
    'file': new FormControl('', [Validators.required])
  });

  constructor(
    private userSer: UserService,
    private toast: NgToastService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
   this.isLoading = true;
    this.id = this.tokenStorage.getIdUser();
    this.userSer.getProfile(this.id)
      .subscribe(data => {
        this.isLoading = false;
        this.user = data.data;
        this.preview = data.data.image;
      });
  }

  get f() {
    return this.userFormEdit.controls;
  }

  // upload file
  onFileChange(event: any) {
    this.preview = '';
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';

        this.currentFile = file;

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }


  update() {
    this.isLoading = true;
    this.userSer.update(this.id, this.userFormEdit.value, this.currentFile)
      .subscribe(response => {
        this.isLoading = false;
        this.toast.success({ summary: 'Cập nhật thông tin cá nhân thành công!', duration: 3000 });
        console.log(response.data);
      });
  }





}
