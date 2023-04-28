import { ImagesService } from './../../_service/images-service/images.service';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../Model/ProductModel';
import { ProductService } from '../../_service/product-service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/_service/cart-service/cart.service';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from 'src/app/app.component';
import { FavouriteService } from 'src/app/_service/favourite-service/favourite.service';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';
import { CartModel } from 'src/app/Model/CartModel';
import { FavouriteModel } from 'src/app/Model/FavouriteModel';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pro: ProductModel = new ProductModel();
  pros: ProductModel[] = [];
  pross: ProductModel[] = [];
  proCates: ProductModel[] = [];
  cart: CartModel = new CartModel();
  fav: FavouriteModel = new FavouriteModel();
  idc!: number;

  productChip: any[] = [];

  categoryId!: number;

  page = 0;
  count = 0;
  pageSize = 10;

  productImage: any[] = [];


  constructor(private proSer: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartSer: CartService,
    private toast: NgToastService,
    private app: AppComponent,
    private favSer: FavouriteService,
    private tokenSer: TokenStorageService,
    private restImage: ImagesService) { }

  ngOnInit(): void {
    this.showListProductImage();
  }


  showListProductImage() {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.restImage.getImagesByProductId(id).subscribe(response => {
      this.productImage = response.data;

      this.categoryId = response.data[0].categoryId;
      console.log(this.categoryId, "id cate");
      this.proSer.getProductByCategory(this.categoryId, 0, 8)
        .subscribe(data => {
          this.proCates = data.data;
          // window.location.reload();
          console.log(data.data, "category")
        });

    })
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reload() {
    window.location.reload();
  }


}
