import { Category } from './../../../_model/Category';
import {ActivatedRoute, Router} from '@angular/router';
import { STATUS } from 'src/app/_model/status';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/_service/category-service/category.service';
import { Component, OnInit } from '@angular/core';
import { GroupComponentService } from 'src/app/_service/group-component/group-component.service';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  isLoading: boolean = true;
  groupC: any[] = [];
  id!: number;
  category: Category = new Category();

  selectedFiles?: FileList;
  currentFile?: File;
  preview = '';

  categoryformEdit = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'status': new FormControl(STATUS.ACTIVE, [Validators.required]),
    'groupId': new FormControl(1, [Validators.required]),
    'file': new FormControl('', [Validators.required]),
    // fileSource: new FormControl('', [Validators.required])
  })

  constructor(
    private rest: CategoryService,
    private toast: NgToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.isLoading = true;
    this.rest.getOne(this.id).subscribe(data => {
      this.isLoading = false;
      this.category = data.data;
      this.preview = data.data.images;
    })

    this.getAllGroupComponent();
  }

  get f() {
    return this.categoryformEdit.controls;
  }


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

  updateCategory() {
    this.isLoading = true;
    this.rest.editCategory(this.id,this.categoryformEdit.value, this.currentFile)
      .subscribe(data => {
        this.isLoading = false;
        this.toast.success({ summary: 'Cập nhập danh mục thành công', duration: 3000 });
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
