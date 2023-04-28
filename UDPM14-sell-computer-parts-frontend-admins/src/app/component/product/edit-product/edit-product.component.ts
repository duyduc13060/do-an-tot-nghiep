import { STATUS } from 'src/app/_model/status';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { CategoryService } from 'src/app/_service/category-service/category.service';
import { NgToastService } from 'ng-angular-popup';
import {ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductApiService } from 'src/app/_service/product-service/product-api.service';
import { Product } from 'src/app/_model/product';
import { error } from 'jquery';
import { BrandService } from 'src/app/_service/Brand-service/brand.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {


  id!: number;
  product: Product = new Product();
  isLoading: boolean = false;

  categories: any[] = [];
  voucher: any[] = [];
  brand: any[] = [];

  validateForm!: FormGroup;

  regex: string = '^[\\w\'\\-,.a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\ ][^_!¡?÷?¿/\\\\+=@#$%ˆ&*{}~<>;:[\\]]{2,}$'

  constructor(
    private restP: ProductApiService,
    private restC: CategoryService,
    private restB: BrandService,
    private rest: ProductApiService,
    private route: ActivatedRoute,
    private toast: NgToastService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllBrand();

    this.id = this.route.snapshot.params['id'];

    this.rest.getOne(this.id).subscribe(data => {
      this.product = data.data;
    })

    this.validateForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(244), Validators.pattern(this.regex)]),
      'code': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
      'price': new FormControl(null, [Validators.required,Validators.pattern('^[0-9]*$')]),
      'quantity': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'discount': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'status': new FormControl(STATUS.ACTIVE, [Validators.required]),
      'brandId': new FormControl(2, [Validators.required]),
      'categoryId': new FormControl(2, [Validators.required]),
    })
  }

  updateProduct() {
    this.isLoading = true;
    this.rest.updateProduct(this.id, this.product).subscribe(data => {
      this.isLoading = false;
      this.toast.success({ summary: 'Cập nhập sản phẩm thành công', duration: 3000 });
      this.router.navigate(['/list-product'])
    })
  }

  getAllCategory() {
    this.isLoading = true;
    this.restC.getAllCategory(0, 999).subscribe(data => {
      this.isLoading = false;
      this.categories = data.data;
    })
  }

  getAllBrand() {
    this.isLoading = true;
    this.restB.getAll().subscribe(data => {
      this.isLoading = false;
      this.brand = data.data;
    })
  }



}
