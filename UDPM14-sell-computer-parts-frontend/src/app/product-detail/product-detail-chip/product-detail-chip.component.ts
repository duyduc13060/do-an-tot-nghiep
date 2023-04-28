import { ImagesService } from './../../_service/images-service/images.service';
import { ProductModel } from './../../Model/ProductModel';
import { Component, OnInit } from '@angular/core';
import { ChipApiService } from '../../_service/chip-service/chip-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/_service/cart-service/cart.service';
import { AppComponent } from 'src/app/app.component';
import { NgToastService } from 'ng-angular-popup';
import { CartModel } from 'src/app/Model/CartModel';
import { FavouriteService } from 'src/app/_service/favourite-service/favourite.service';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';
import { FavouriteModel } from 'src/app/Model/FavouriteModel';

@Component({
  selector: 'app-product-detail-chip',
  templateUrl: './product-detail-chip.component.html',
  styleUrls: ['./product-detail-chip.component.css']
})
export class ProductDetailChipComponent implements OnInit {


  productChip: any[] = [];
  productImage: any[] = [];
  cart: CartModel = new CartModel();
  fav: FavouriteModel = new FavouriteModel();

  constructor(
    private rest: ChipApiService,
    private activatedRoute: ActivatedRoute,
    private restImage: ImagesService,
    private router: Router,
    private cartSer: CartService,
    private app: AppComponent,
    private toast: NgToastService,
    private favSer: FavouriteService,
    private tokenSer: TokenStorageService) { }

  ngOnInit() {
    this.showProductChipDetail();
  }

  showProductChipDetail(){
    let id = +this.activatedRoute.snapshot.params['id'];

    this.rest.getOneProductChipByProductId(id)
    .subscribe(response=>{
      this.productChip = response.data;
      console.log(response.data, "product detail chip");
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
