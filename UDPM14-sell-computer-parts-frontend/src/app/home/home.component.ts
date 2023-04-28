import { ChipApiService } from './../_service/chip-service/chip-api.service';
import { GroupService } from './../_service/group-service/group.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../Model/CategoryModel';
import { FavouriteModel } from '../Model/FavouriteModel';
import { CategoryService } from '../_service/catergory-service/category.service';
import { FavouriteService } from '../_service/favourite-service/favourite.service';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from '../_service/cart-service/cart.service';
import { AppComponent } from '../app.component';
import { CartModel } from '../Model/CartModel';
import { TokenStorageService } from '../_service/token-storage-service/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cate: CategoryModel = new CategoryModel();
  cates: CategoryModel[] = [];
  favs: any[] = [];
  cart: CartModel = new CartModel();
  fav: FavouriteModel = new FavouriteModel();


  constructor(
    private cateSer: CategoryService,
    private favSer: FavouriteService,
    private toast: NgToastService,
    private cartSer: CartService,
    private app: AppComponent,
    private tokenSer: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllFavourite();
  }


  getAllCategory() {
    this.cateSer.getAllCategory(0, 8)
      .subscribe(data => {
        this.cates = data.data;
      });
  }

  getAllFavourite() {
    this.favSer.getAllFavourite()
      .subscribe(data => {
        this.favs = data.data;
        console.log(data.data)
      })
  }

  addToCart(fav: any) {
    this.cart.productId = fav.productId;
    this.cartSer.createCart(this.cart)
      .subscribe(data => {
        this.cart = data.data;
        this.toast.success({ summary: 'Thêm sản phẩm ' + fav.name + ' thành công!', duration: 3000 });
        this.app.ngOnInit();
      });
  }

  createFavourite(id: number) {
    this.fav.productId = id;
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


