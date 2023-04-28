import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_service/category-service/category.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { STATUS } from 'src/app/_model/status';
import { NgToastService } from 'ng-angular-popup';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  isLoading: boolean = true;
  groupC: any[] = [];

  selectedFiles?: FileList;
  currentFile?: File;
  img_url = '';

  categoryform = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'status': new FormControl(STATUS.ACTIVE, [Validators.required]),
    'groupId': new FormControl(1, [Validators.required]),
    'file': new FormControl('', [Validators.required]),
    // 'fileSource': new FormControl('', [Validators.required])
  })


  constructor(
    private rest: CategoryService,
    private toast: NgToastService,
    private router: Router,
  ) {

  }

  get f() {
    return this.categoryform.controls;
  }

  ngOnInit(): void {
    this.getAllGroupComponent();
  }

  onFileChange(event: any) {
    this.img_url = '';
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.img_url = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.img_url = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }

  }

  createCategory() {
    this.isLoading = true;
    this.rest.createCategory(this.categoryform.value, this.currentFile)
      .subscribe(data => {
        this.isLoading = false;
        this.toast.success({ summary: 'Thêm danh mục thành công', duration: 3000 });
        this.router.navigate(['/list-category'])
      })

  }


  getAllGroupComponent() {
    this.isLoading = true;
    this.rest.getAllGroupcomponent().subscribe(data => {
      this.isLoading = false;
      this.groupC = data.data;
    })
  }



}
