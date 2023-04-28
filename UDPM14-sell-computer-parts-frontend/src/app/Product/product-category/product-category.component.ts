import { CaseApiService } from './../../_service/case-service/case-api.service';
import { CategoryService } from './../../_service/catergory-service/category.service';
import { ChipApiService } from './../../_service/chip-service/chip-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from 'src/app/app.component';
import { BrandModel } from 'src/app/Model/BrandModel';
import { CartModel } from 'src/app/Model/CartModel';
import { ColorModel } from 'src/app/Model/ColorModel';
import { FavouriteModel } from 'src/app/Model/FavouriteModel';
import { ProductModel } from 'src/app/Model/ProductModel';
import { BrandService } from 'src/app/_service/brand-service/brand.service';
import { CartService } from 'src/app/_service/cart-service/cart.service';
import { ColorService } from 'src/app/_service/color-service/color.service';
import { FavouriteService } from 'src/app/_service/favourite-service/favourite.service';
import { ProductService } from 'src/app/_service/product-service/product.service';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';
import { FillterService } from 'src/app/_service/fillter-service/fillter.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {


  pros: any[] = [];

  colors: ColorModel[] = [];
  brands: BrandModel[] = [];
  fav: FavouriteModel = new FavouriteModel();
  cart: CartModel = new CartModel();
  title = '';
  page: number = 0;
  count: number = 0;
  pageSize: number = 9;

  filter: any[] = [];
  category_id!: number;


  constructor(private router: Router,
    private proSer: ProductService,
    private activatedRoute: ActivatedRoute,
    private colorSer: ColorService,
    private brandSer: BrandService,
    private restChip: ChipApiService,
    private fillterSer: FillterService) { }

  ngOnInit(): void {
    this.showProductByCate();
    this.showAllColor();
    this.showAllBrand();
  }

  getRequestParams(page: number, pageSize: number): any {
    const params: any = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`page-size`] = pageSize;
    }

    return params;
  }

  showProductByCate() {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.proSer.getProductByCategory(id, 0, 9)
      .subscribe(data => {
        const totalItem = data.pagination.totalItem;
        this.filter = data.data;
        console.log(data.data);
        this.count = totalItem;
      });
  }

  showAllColor() {
    this.colorSer.getAllColor()
      .subscribe(data => {
        this.colors = data.data;
      })
  }

  showAllBrand() {
    this.brandSer.getAllBrand()
      .subscribe(data => {
        this.brands = data.data;
      });
  }

  handlePageChange(event: number) {
    this.page = event;
    this.showProductByCate();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.showProductByCate();
  }

  searchTitle(): void {
    this.page = 0;
    this.showProductByCate();
  }


  fillterByPrice1() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.fillterSer.fillterByPrice(0, 1000, 0, 9)
    .subscribe(data => {
      const totalItem = data.pagination.totalItem;
      this.filter = data.data;
      console.log(data.data);
      this.count = totalItem;
    });
  }

  fillterByPrice2() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.fillterSer.fillterByPrice(1000, 5000, 0, 9)
    .subscribe(data => {
      const totalItem = data.pagination.totalItem;
      this.filter = data.data;
      console.log(data.data);
      this.count = totalItem;
    });
  }

  fillterByPrice3() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.fillterSer.fillterByPrice(5000, 10000, 0, 9)
    .subscribe(data => {
      const totalItem = data.pagination.totalItem;
      this.filter = data.data;
      console.log(data.data);
      this.count = totalItem;
    });
  }

  fillterByPrice4() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.fillterSer.fillterByPrice(10000, 50000, 0, 9)
    .subscribe(data => {
      const totalItem = data.pagination.totalItem;
      this.filter = data.data;
      console.log(data.data);
      this.count = totalItem;
    });
  }

  fillterByPrice5() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.fillterSer.fillterByPrice(50000, 9999999, 0, 9)
    .subscribe(data => {
      const totalItem = data.pagination.totalItem;
      this.filter = data.data;
      console.log(data.data);
      this.count = totalItem;
    });
  }

  fillterByColor(color: any) {
    const id = color.id;
    this.fillterSer.fillterByColor(id, 0, 9)
    .subscribe(data => {
      const totalItem = data.pagination.totalItem;
      this.filter = data.data;
      console.log(data.data);
      this.count = totalItem;
    })
  }

  fillterByBrand(brand: any) {
    const id = brand.id;
    this.fillterSer.fillterByColor(id, 0, 9)
    .subscribe(data => {
      const totalItem = data.pagination.totalItem;
      this.filter = data.data;
      console.log(data.data);
      this.count = totalItem;
    })
  }
}
