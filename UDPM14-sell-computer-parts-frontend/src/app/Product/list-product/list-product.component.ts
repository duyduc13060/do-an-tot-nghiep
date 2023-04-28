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
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

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
    private fillterSer: FillterService,
    private cartSer: CartService,
    private favSer: FavouriteService,
    private toast: NgToastService,
    private tokenSer: TokenStorageService,
    private app: AppComponent,) { }

  ngOnInit(): void {
    this.showAllProduct();
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

  showAllProduct() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.proSer.findAllProductList(this.title, 0, 9)
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
    this.showAllProduct();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.showAllProduct();
  }

  searchTitle(): void {
    this.page = 0;
    this.showAllProduct();
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


  fillterByPrice1() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.fillterSer.fillterByPrice(500000, 1000000, 0, 9)
    .subscribe(data => {
      const totalItem = data.pagination.totalItem;
      this.filter = data.data;
      console.log(data.data);
      this.count = totalItem;
    });
  }

  fillterByPrice2() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.fillterSer.fillterByPrice(1000000, 5000000, 0, 9)
    .subscribe(data => {
      const totalItem = data.pagination.totalItem;
      this.filter = data.data;
      console.log(data.data);
      this.count = totalItem;
    });
  }

  fillterByPrice3() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.fillterSer.fillterByPrice(5000000, 10000000, 0, 9)
    .subscribe(data => {
      const totalItem = data.pagination.totalItem;
      this.filter = data.data;
      console.log(data.data);
      this.count = totalItem;
    });
  }

  fillterByPrice4() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.fillterSer.fillterByPrice(10000000, 15000000, 0, 9)
    .subscribe(data => {
      const totalItem = data.pagination.totalItem;
      this.filter = data.data;
      console.log(data.data);
      this.count = totalItem;
    });
  }

  fillterByPrice5() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.fillterSer.fillterByPrice(150000000, 20000000, 0, 9)
    .subscribe(data => {
      const totalItem = data.pagination.totalItem;
      this.filter = data.data;
      console.log(data.data);
      this.count = totalItem;
    });
  }
  fillterByPrice6() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.fillterSer.fillterByPrice(20000000, 10000000000, 0, 9)
      .subscribe(data => {
        const totalItem = data.pagination.totalItem;
        this.filter = data.data;
        console.log(data.data);
        this.count = totalItem;
      });
  }
  fillterByPrice7() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.fillterSer.fillterByPrice(0, 500000, 0, 9)
      .subscribe(data => {
        const totalItem = data.pagination.totalItem;
        this.filter = data.data;
        console.log(data.data);
        this.count = totalItem;
      });
  }

  addToCart(pro: any) {
    this.cart.productId = pro.id;
    console.log(pro.id);
    this.cartSer.createCart(this.cart)
      .subscribe(data => {
        this.cart = data.data;
        this.toast.success({ summary: 'Thêm sản phẩm ' + pro.name + ' thành công!', duration: 3000 });
        this.app.ngOnInit();
      });
  }

  createFavourite(pro: any) {
    this.fav.productId = pro.id;
    this.fav.accountId = this.tokenSer.getUser();
    this.fav.likeDate = new Date();

    this.favSer.createFavourite(this.fav)
      .subscribe(data => {
        this.fav = data.data;
        console.log(data.data);
        this.toast.success({ summary: 'Thêm sản phẩm vào yêu thích thành công!', duration: 3000 });
      }, error => this.toast.error({ summary: 'Thêm sản phẩm vào yêu thích thất bại!', duration: 3000 }));
  }

}
