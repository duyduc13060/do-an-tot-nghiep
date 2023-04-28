import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ImageApiService } from 'src/app/_service/image-service/image-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  isLoading: boolean = true;
  products: any[] = [];

  selectedFiles?: FileList;
  currentFile?: File;
  preview = '';

  imageformAdd = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'link': new FormControl('', [Validators.required]),
    'product_id': new FormControl(1, [Validators.required]),
    'file': new FormControl('', [Validators.required]),
  })


  constructor(
    private restI: ImageApiService,
    private toast: NgToastService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    this.isLoading = true;
    this.restI.getAllProduct(0, 999).subscribe(respose => {
      this.isLoading = false;
      this.products = respose.data;
      console.log(respose.data+"ahsdj")
    })
  }

  get f() {
    return this.imageformAdd.controls;
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

  addImage() {
    this.isLoading = true;
    this.restI.create(this.imageformAdd.value, this.currentFile).subscribe(response => {
      this.isLoading = false;
      this.toast.success({ summary: 'Create category successfuly', duration: 3000 });
      console.log(response.data);
    })
  }



}
