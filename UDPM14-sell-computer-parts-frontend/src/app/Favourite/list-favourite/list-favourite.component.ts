import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from 'src/app/app.component';
import { CartModel } from 'src/app/Model/CartModel';
import { FavouriteModel } from 'src/app/Model/FavouriteModel';
import { ProductModel } from 'src/app/Model/ProductModel';
import { CartService } from 'src/app/_service/cart-service/cart.service';
import { FavouriteService } from 'src/app/_service/favourite-service/favourite.service';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';

@Component({
  selector: 'app-list-favourite',
  templateUrl: './list-favourite.component.html',
  styleUrls: ['./list-favourite.component.css']
})
export class ListFavouriteComponent implements OnInit {

  favs: any[] = [];
  fav: FavouriteModel = new FavouriteModel();
  pro: ProductModel  = new ProductModel();
  cart: CartModel = new CartModel();
  pros: ProductModel[] =[];

  constructor(private favSer: FavouriteService,
              private router: Router,
              private tokenStorageSer: TokenStorageService,
              private toast: NgToastService,
              private cartSer: CartService,
              private app: AppComponent) { }

  ngOnInit(): void {
    this.showFavourite();
  }

  showFavourite() {
    this.favSer.getFavouriteByUser()
    .subscribe(data => {
      this.favs = data.data;
    });
  }

  deleteFavourite(fav: FavouriteModel) {
    this.favSer.deleteFavourite(fav.id)
    .subscribe(data => {
      fav = data.data;
      this.toast.success({summary:'Xóa sản phẩm khỏi mục yêu thích thành công', duration:3000});
      this.showFavourite();
    }, error => this.toast.error({summary:'Xóa sản phẩm khỏi mục yêu thích thất bại', duration:3000}));
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

}
