import { ImagesService } from './../../_service/images-service/images.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CaseApiService } from '../../_service/case-service/case-api.service';
import { ProductModel } from '../../Model/ProductModel';
import { CartService } from 'src/app/_service/cart-service/cart.service';
import { AppComponent } from 'src/app/app.component';
import { NgToastService } from 'ng-angular-popup';
import { CartModel } from 'src/app/Model/CartModel';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';
import { FavouriteService } from 'src/app/_service/favourite-service/favourite.service';
import { FavouriteModel } from 'src/app/Model/FavouriteModel';

@Component({
  selector: 'app-product-detail-case',
  templateUrl: './product-detail-case.component.html',
  styleUrls: ['./product-detail-case.component.css']
})
export class ProductDetailCaseComponent implements OnInit {

  productCase: any[] = [];
  productImage: any[] = [];
  cart: CartModel = new CartModel();
  fav: FavouriteModel = new FavouriteModel();

  constructor(
    private rest: CaseApiService,
    private activatedRoute: ActivatedRoute,
    private restImage: ImagesService,
    private router: Router,
    private cartSer: CartService,
    private app: AppComponent,
    private toast: NgToastService,
    private favSer: FavouriteService,
    private tokenSer: TokenStorageService
  ) { }

  ngOnInit() {
    this.showProductCaseDetail();
  }

  showProductCaseDetail(){
    let id = +this.activatedRoute.snapshot.params['id'];

    this.rest.getOneProductCaseWithProductId(id)
    .subscribe(response=>{
      this.productCase = response.data;
      console.log(response.data, "product detail case");
    })
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

  addToCart(pro: any) {
    this.cart.productId = pro.productId;
    this.cartSer.createCart(this.cart)
      .subscribe(data => {
        this.cart = data.data;
        this.toast.success({ summary: 'Thêm sản phẩm ' + pro.name + ' thành công!', duration: 3000 });
        this.app.ngOnInit();
      });
  }
}
