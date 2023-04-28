import { FormGroup, FormControl, Validators } from '@angular/forms';
import { data } from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { ProductApiService } from 'src/app/_service/product-service/product-api.service';
import { NgToastService } from 'ng-angular-popup';
import { Component, OnInit } from '@angular/core';
import { Images } from 'src/app/_model/images';
import { ImageApiService } from 'src/app/_service/image-service/image-api.service';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnInit {

  isLoading: boolean = true;
  image: Images = new Images();
  products: any[] = [];
  id!: number;

  selectedFiles?: FileList;
  currentFile?: File;
  preview = '';

  imageformEdit = new FormGroup({
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
    this.id = this.route.snapshot.params['id'];
    this.isLoading = true;
    this.restI.getById(this.id).subscribe(response => {
      this.isLoading = false;
      this.image = response.data;
      this.preview = response.data.link;
    })

    this.getAllProduct();
  }

  get f() {
    return this.imageformEdit.controls;
  }


  getAllProduct(){
    this.isLoading = true;
    this.restI.getAllProduct(0,999).subscribe(respose=>{
      this.isLoading = false;
      this.products = respose.data;
    })
  }

  onFileChange(event: any){
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

  updateImage(){
    this.isLoading = true;
    this.restI.update(this.id, this.imageformEdit.value, this.currentFile).subscribe(response=>{
      this.isLoading = false;
      this.toast.success({ summary: 'Update category successfuly', duration: 3000 });
      console.log(response.data);
    })
  }



}
