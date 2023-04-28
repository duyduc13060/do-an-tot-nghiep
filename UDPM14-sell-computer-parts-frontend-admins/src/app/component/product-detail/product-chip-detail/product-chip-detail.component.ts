import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChipApiService } from '../../../_service/chip-service/chip-api.service';
import { CartService } from '../../../_service/cart-service/cart.service';
import { NgToastService } from 'ng-angular-popup';
import { CartModel } from '../../../_model/CartModel';

@Component({
  selector: 'app-product-chip-detail',
  templateUrl: './product-chip-detail.component.html',
  styleUrls: ['./product-chip-detail.component.css']
})
export class ProductChipDetailComponent implements OnInit {

  cart: CartModel = new CartModel();
  productChip: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private restChip: ChipApiService,
    private router: Router,
    private restCart: CartService,
    private toast: NgToastService
  ) { }

  ngOnInit() {
    this.showProductChipDetail();
  }

  showProductChipDetail(){
    let id = +this.activatedRoute.snapshot.params['id'];

    this.restChip.getOneProductChipByProductId(id)
    .subscribe(response=>{
      this.productChip = response.data;
      console.log(response.data, "product detail chip");
    })
  }

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



