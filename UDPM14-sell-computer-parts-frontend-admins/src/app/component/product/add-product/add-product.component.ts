import { Router } from '@angular/router';
import { STATUS } from 'src/app/_model/status';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Product } from 'src/app/_model/product';
import { ProductApiService } from './../../../_service/product-service/product-api.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_service/category-service/category.service';
import { BrandService } from 'src/app/_service/Brand-service/brand.service';
import { ImageApiService } from 'src/app/_service/image-service/image-api.service';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../_helper/confirm-dialog/confirm-dialog.component';
import { Constant } from '../../../_constant/Constant';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isEditable = false;
  product: Product = new Product;

  isLoading:boolean =false;
  id: any;
  categories: any[] = [];
  brand: any[] = [];
  selectedFiles?: FileList;
  currentFile?: File;
  preview = '';
  validateForm!: FormGroup;

  imageformAdd = new FormGroup({

    'name': new FormControl('', [Validators.required]),
    'link': new FormControl(''),
    'product_id': new FormControl(null),
    'file': new FormControl('', [Validators.required]),
  })

  regex: string = '^[\\w\'\\-,.a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\ ][^_!¡?÷?¿/\\\\+=@#$%ˆ&*{}~<>;:[\\]]{2,}$'

  constructor(
    private restP: ProductApiService,
    private restC: CategoryService,
    private restB: BrandService,
    private toast: NgToastService,
     private route: Router,
     private _formBuilder: FormBuilder,
     private tokenStorage: TokenStorageService,
     private restI: ImageApiService,
     private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllBrand();

    this.validateForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(244), Validators.pattern(this.regex)]),
      'code': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
      'price': new FormControl(null, [Validators.required,Validators.pattern('^[0-9]*$')]),
      'quantity': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'discount': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'status': new FormControl(STATUS.ACTIVE, [Validators.required]),
      'brandId': new FormControl(2, [Validators.required]),
      'categoryId': new FormControl(2, [Validators.required]),
      'description': new FormControl(null)
    })
  }

  createProduct(stepper: MatStepper) {
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Tạo sản phẩm mới?'
      }
    }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {

          this.isLoading = true;
    // console.log(this.product);
    // console.log(this.imageformAdd);


    this.restP.createProduct(this.product).subscribe({
      next: data => {
        // this.toast.success({ summary: 'Thêm sản phẩm thành công', duration: 1000 });
      console.log('Data ----- product');
      console.log(data.data);
      this.id=data.data.id;
        this.imageformAdd.patchValue({
          product_id:
            this.id
        })
        this.addImage(stepper);
      },
      error: e=>{
        console.log(e);
        this.toast.error({ summary: e.error.message, duration: 3000 });
        this.selectStepIndex(stepper, 0);
        this.isLoading = false;
      }
    })

        }
    })

  }

  addImage(stepper: MatStepper) {
    console.log(this.imageformAdd);

    this.isLoading = true;
    this.restI.create(this.imageformAdd.value, this.currentFile).subscribe({
      next: response => {
        this.isLoading = false;
        this.toast.success({ summary: 'Thêm sản phẩm thành công', duration: 3000 });
        this.route.navigate(['/list-product']);
        console.log('Data ----- image');
        console.log(response.data);
      },
      error: e=>{
        this.isLoading = false;
        console.log(e);
        this.toast.error({ summary: e.error.message, duration: 3000 });
        this.selectStepIndex(stepper, 1);
      }
    })
  }



  getAllCategory() {
    this.isLoading = true;
    this.restC.getAllCategory(0, 999).subscribe(data => {
      this.isLoading = false;
      this.categories = data.data;
    })
  }

  getAllBrand(){
    this.isLoading = true;
    this.restB.getAll().subscribe(data=>{
      this.isLoading = false;
      this.brand = data.data;

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



  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  selectStepIndex(stepper: MatStepper,index: number){
    stepper.selectedIndex = index;
  }


}
