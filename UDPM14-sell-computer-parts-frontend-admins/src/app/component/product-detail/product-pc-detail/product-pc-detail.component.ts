import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PcService } from '../../../_service/Pc-service/pc.service';
import { CartModel } from '../../../_model/CartModel';
import { CartService } from '../../../_service/cart-service/cart.service';
import { NgToastService } from 'ng-angular-popup';
import { TokenStorageService } from '../../../_service/token-storage-service/token-storage.service';
import { OrderService } from '../../../_service/order-service/order.service';

@Component({
  selector: 'app-product-pc-detail',
  templateUrl: './product-pc-detail.component.html',
  styleUrls: ['./product-pc-detail.component.css']
})
export class ProductPcDetailComponent implements OnInit {

  cart: CartModel = new CartModel();
  productPc: any[] = [];


  isLoading: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restPc: PcService,
    private restCart: CartService,
    private toast: NgToastService,
    private tokenStorageService: TokenStorageService,
    private restOrder: OrderService
  ) { }

  ngOnInit() {
    this.showProductPcDetail();
  }

  showProductPcDetail() {
    let id = +this.activatedRoute.snapshot.params['id'];

    this.restPc.getOneProductPCByProductId(id)
      .subscribe(response => {
        this.productPc = response.data;
        console.log(response.data, "product detail pc");
      })

  }

  // createOrderDetail() {
  //   this.isLoading = true;
  //   console.log(this.tokenStorageService.get('id_pro'));

  //   this.restOrder.createOrderDetail(this.delivery.id, this.tokenStorageService.get('id_pro')).subscribe((res: any) => {
  //     this.isLoading = false;
  //     this.toast.success({ summary: 'Thêm sản phẩm thành công', duration: 3000 });

  //     this.getOrderDetails();
  //     this.sumPriceOrderDetail();

  //   }, error => {
  //     console.log(error);
  //     this.toast.error({ summary: 'Thêm sản phẩm thất bại' });
  //     this.isLoading = false;
  //   });
  // }

   // phần sản phẩm đặt
   addToCart(pro: any) {
    this.cart.productId = pro.productId;
    console.log(pro.id);
    this.restCart.createCart(this.cart)
      .subscribe(data => {
        this.cart = data.data;
        this.toast.success({ summary: 'Thêm sản phẩm ' + pro.name + ' thành công!', duration: 3000 });
        this.router.navigate(['/buy-offline']);
      });
  }


}
