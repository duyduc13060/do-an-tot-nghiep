import { ProductModel } from './../../Model/ProductModel';
import { CaseApiService } from './../../_service/case-service/case-api.service';
import { CategoryService } from './../../_service/catergory-service/category.service';
import { ChipApiService } from './../../_service/chip-service/chip-api.service';
import { TokenStorageService } from './../../_service/token-storage-service/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { FavouriteService } from './../../_service/favourite-service/favourite.service';
import { BrandService } from './../../_service/brand-service/brand.service';
import { ColorService } from './../../_service/color-service/color.service';
import { ProductService } from './../../_service/product-service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FavouriteModel } from './../../Model/FavouriteModel';
import { BrandModel } from './../../Model/BrandModel';
import { ColorModel } from './../../Model/ColorModel';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/_service/cart-service/cart.service';
import { AppComponent } from 'src/app/app.component';
import { CartModel } from 'src/app/Model/CartModel';

@Component({
  selector: 'app-list-product-chip',
  templateUrl: './list-product-chip.component.html',
  styleUrls: ['./list-product-chip.component.css']
})
export class ListProductChipComponent implements OnInit {

  productChip: any[] = [];
  fav: FavouriteModel = new FavouriteModel();
  cart: CartModel = new CartModel();
  title = '';
  page: number = 0;
  count: number = 0;
  pageSize: number = 9;

  constructor(private router: Router,
    private proSer: ProductService,
    private activatedRoute: ActivatedRoute,
    private favSer: FavouriteService,
    private toast: NgToastService,
    private tokenSer: TokenStorageService,
    private restChip: ChipApiService,
    private cartSer: CartService,
    private app: AppComponent,) { }

  ngOnInit(): void {
    this.showProductByCate();
  }

  getRequestParams(searchName: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchName) {
      params[`name`] = searchName;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`page-size`] = pageSize;
    }

    return params;
  }

  showProductByCate() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    let id = +this.activatedRoute.snapshot.params['id'];

    this.restChip.getAllProductChipByCategoryId(id,params)
      .subscribe(data => {
        const totalItem = data.pagination.totalItem;
        this.productChip = data.data;
        console.log(data.data, "list-chip");
        this.count = totalItem;
      });
  }

  handlePageChange(event: number) {
    this.page = event;
    this.showProductByCate()
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.showProductByCate()
  }

  searchTitle(): void {
    this.page = 0;
    this.showProductByCate();
  }

  addToCart(pro: any) {
    this.cart.productId = pro.productId;
    this.cartSer.createCart(this.cart)
      .subscribe(data => {
        this.cart = data.data;
        this.toast.success({ summary: 'Thêm sản phẩm ' + pro.name + ' thành công!', duration: 3000 });
        this.app.ngOnInit();
      });
  }

  createFavourite(pro: any) {
    this.fav.productId = pro.productId;
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
