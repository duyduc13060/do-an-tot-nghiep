import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';
import { AppComponent } from '../app.component';
import { CartModel } from '../Model/CartModel';
import { CartService } from '../_service/cart-service/cart.service';
import { ProductService } from '../_service/product-service/product.service';
import { VoucherService } from '../_service/voucher-service/voucher.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: CartModel[] = [];
  totalAmount: number = 0;
  quantityCart: number = 0;
  quantity!: number;
  voucher!: string;
  amount!: number;
  code: any;
  value: any;

  constructor(private cartSer: CartService,
              private toast: NgToastService,
              private proSer: ProductService,
              private app: AppComponent,) { }

  ngOnInit(): void {
    this.getCartByUser();
    this.getSumTotal();
  }

  getCartByUser() {
    this.cartSer.getAllCartByUser()
      .subscribe(data => {
        this.carts = data.data;
      });
  }

  getSumTotal() {
    this.cartSer.getSumTotal()
      .subscribe(data => {
        this.totalAmount = data.data.totalAmount;
        this.quantityCart = data.data.quantityCart;
      });
  }

  plusQuantityCart(cart: any) {
    cart.quantity++;
    this.proSer.getOneProduct(cart.product_id)
    .subscribe(data => {
      if (cart.quantity > data.data.quantity) {
        this.toast.warning({ summary: 'Số lượng vượt quá số lượng trong kho!', duration: 3000 });
        this.ngOnInit();
      } else {
        this.cartSer.updateCart(cart.product_id, cart)
        .subscribe(data => {
           this.ngOnInit();
        });
      }
    });

  }

  minusQuantityCart(cart: any) {
    cart.quantity--;
    if (cart.quantity < 1) {
      this.toast.warning({ summary: 'Số lượng sản phẩm phải lớn hơn 0!', duration: 3000 });
        this.ngOnInit();
    } else {
      this.cartSer.updateCart(cart.product_id, cart)
      .subscribe(data => {
        this.ngOnInit();
      });
    }
  }

  updateCart(cart: any) {
    if (cart.quantity < 1) {
      this.toast.warning({ summary: 'Số lượng sản phẩm phải lớn hơn 0!', duration: 3000 });
      this.ngOnInit();
    } else if (cart.quantity >= 'a' && cart.quantity <= 'z' || cart.quantity >= 'A' && cart.quantity <= 'Z') {
      this.toast.warning({ summary: 'Số lượng sản phẩm phải là số!', duration: 3000 });
      this.ngOnInit();
    } else {
      this.proSer.getOneProduct(cart.product_id)
        .subscribe(data => {
          if (cart.quantity > data.data.quantity) {
            this.toast.warning({ summary: 'Số lượng vượt quá số lượng trong kho!', duration: 3000 });
            this.ngOnInit();
          } else {
            this.cartSer.updateCart(cart.product_id, cart)
              .subscribe(data => {
                this.ngOnInit();
              });
          }
        });
    }
  }

  deleteCart(cart: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Xóa Khỏi Giỏ Hàng',
      text: "Bạn có chắc chắn muốn xóa sản phẩm khỏi giỏ hàng không?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Chắc Chắn!',
      cancelButtonText: 'Không',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartSer.deleteCart(cart.product_id)
          .subscribe(data => {
            this.toast.success({ summary: 'Xóa sản phẩm khỏi giỏ hàng thành công!', duration: 3000 });
            this.ngOnInit();
            this.app.ngOnInit();
          });
        swalWithBootstrapButtons.fire('Deleted!','Xóa Sản Phẩm Khỏi Giỏ Hàng Thành Công', 'success')
      }
    })
  }
}
