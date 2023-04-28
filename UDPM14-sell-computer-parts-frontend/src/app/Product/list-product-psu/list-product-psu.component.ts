import { Router, ActivatedRoute } from '@angular/router';
import { FavouriteModel } from 'src/app/Model/FavouriteModel';
import { Component, OnInit } from '@angular/core';
import { PsuApiService } from 'src/app/_service/psu-service/psu-api.service';
import { FavouriteService } from 'src/app/_service/favourite-service/favourite.service';
import { NgToastService } from 'ng-angular-popup';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';
import { CartService } from 'src/app/_service/cart-service/cart.service';
import { AppComponent } from 'src/app/app.component';
import { ProductModel } from 'src/app/Model/ProductModel';
import { CartModel } from 'src/app/Model/CartModel';

@Component({
  selector: 'app-list-product-psu',
  templateUrl: './list-product-psu.component.html',
  styleUrls: ['./list-product-psu.component.css']
})
export class ListProductPsuComponent implements OnInit {

  productPsu: any[] = [];


  fav: FavouriteModel = new FavouriteModel();
  cart: CartModel = new CartModel();
  title = '';
  page: number = 0;
  count: number = 0;
  pageSize: number = 9;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rest: PsuApiService,
    private favSer: FavouriteService,
    private toast: NgToastService,
    private tokenSer: TokenStorageService,
    private cartSer: CartService,
    private app: AppComponent,
  ) { }

  ngOnInit() {
    this.showProductByPsu();
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

  showProductByPsu() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

     let id = +this.activatedRoute.snapshot.params['id'];
     this.rest.getProductPsuByCategoryId(id,params)
       .subscribe(data => {
         const totalItem = data.pagination.totalItem;
         this.productPsu = data.data;
         console.log(data.data + "list-psu");
         this.count = totalItem;
       });
   }

   handlePageChange(event: number) {
    this.page = event;
    this.showProductByPsu()
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.showProductByPsu()
  }

  searchTitle(): void {
    this.page = 0;
    this.showProductByPsu();
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
