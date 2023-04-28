import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { CartModel } from '../Model/CartModel';
import { CheckoutModel } from '../Model/CheckoutModel';
import { Payment } from '../Model/Payment';
import { CartService } from '../_service/cart-service/cart.service';
import { CheckoutService } from '../_service/checkout-service/checkout.service';
import { GhnService } from '../_service/ghn-service/ghn.service';
import { PaymentService } from '../_service/payment-service/payment.service';
import { PromotionService } from '../_service/promotion-service/promotion.service';
import { VoucherService } from '../_service/voucher-service/voucher.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {

  cart: CartModel = new CartModel();
  carts: CartModel[] = [];

  pays: any[] = [];
  pays1: any[] = [];

  provinceName: any;
  provinceId: any;
  districtName: any;
  wardName: any;
  province: any[] = [];
  district: any[] = [];
  ward: any[] = [];

  shippingTotal: any;
  serviceId: any;
  addressName: any;

  ship: any;
  sdt: any;
  nameKh: any;
  des: any;
  tinh: any;
  quan: any;
  xa: any;

  payment: Payment = new Payment();
  payment2: Payment = new Payment();

  checkouts: CheckoutModel = new CheckoutModel();
  totalAmount: number = 0;
  quantityCart!: number;
  discount: number = 0;
  amount!: number;
  validForm!: FormGroup;
  code: any;
  value: number = 0;
  isLoading: boolean = false;
  provenId!: number;

  constructor(private cartSer: CartService,
              private checkoutSer: CheckoutService,
              private vouSer: VoucherService,
              private toast: NgToastService,
              private paymentSer: PaymentService,
              private app: AppComponent,
              private promotionSer: PromotionService,
              private restGhn: GhnService,
              private router: Router) { }

  ngOnInit(): void {
    this.validForm = new FormGroup({
      'fullname': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$"), Validators.minLength(5), Validators.maxLength(20)]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern("(\\+84|0)([0-9]{9}|[0-9]{10})")]),
      'province': new FormControl(null, Validators.required),
      'district': new FormControl(null, Validators.required),
      'ward': new FormControl(null, Validators.required),
    });

    this.getCartByUser();
    this.getSumTotal();
    this.getPayment();
    this.getProvinces();
  }

  getCartByUser() {
    this.cartSer.getAllCartByUser()
      .subscribe(data => {
        this.carts = data.data;
      });
  }

  getPayment() {
    this.paymentSer.getPayment()
    .subscribe(data => {
      this.pays[0] = data.data[0];
      this.pays1[0] = data.data[1];

      console.log(this.pays+ "0");
      console.log(this.pays1+ "1");

    });
  }

  getOnePayment1(id:number){
    this.paymentSer.getOne(id).subscribe(response=>{
      this.payment = response.data;
      console.log(this.payment + "hg" + id + "da");

    })
  }

  getOnePayment2(id:number){
    this.paymentSer.getOne(id).subscribe(response=>{
      this.payment2 = response.data;
      console.log(this.payment + "hg" + id + "da");

    })
  }

  getAmount() {
    return this.amount = this.totalAmount + this.shippingTotal;
  }

  getSumTotal() {
    this.cartSer.getSumTotal()
      .subscribe(data => {
        this.totalAmount = data.data.totalAmount;
        this.quantityCart = data.data.quantityCart;
      });
  }

  checkPromotion() {
    this.promotionSer.checkPromotion(this.code)
    .subscribe(data => {
      console.log(data);
      this.value = data.data.discountValue;
    })
  }

  checkoutProduct() {
    this.checkouts.address = this.addressName;
    this.checkouts.shipping = this.shippingTotal;
    // this.checkouts.grandTotal = this.getAmount();
    this.checkoutSer.checkOut(this.checkouts)
    .subscribe(data => {
      console.log(data.data);
      this.toast.success({ summary: 'Đặt hàng thành công!', duration: 3000 });
      this.ngOnInit();
      this.app.ngOnInit();
      this.router.navigate(["list-order"]);
    });
  }

  getShipping(districtId: any) {
    const data = {
      "shop_id": 3526682,
      "from_district": 1542, // tu ha dong
      "to_district": districtId
    }

    this.restGhn.getService(data).subscribe(res => {
      if (res.data.length <= 1) {
        this.serviceId = res.data[0].service_id;
      } else {
        this.serviceId = res.data[1].service_id;
      }

      const shippingOrder = {
        "service_id": this.serviceId,
        "insurance_value": this.totalAmount,
        "from_district_id": 3440,
        "to_district_id": data.to_district,
        "weight": 20
      }

      this.restGhn.getShipping(shippingOrder).subscribe(res => {
        this.shippingTotal = res.data.total;
      })

    })

  }

  getProvinces() {
    this.restGhn.getProvince().subscribe(response => {
      this.province = response.data;
      console.log(response.data)
    })
  }

  getDistrict(provinceId: number) {
    this.restGhn.getDistrict(provinceId).subscribe(response => {
      this.district = response.data;
      console.log(response.data);
      console.log(provinceId);
    })
    // this.provinceName = provinceName;
    this.provinceId = provinceId;
  }

  getWard(districtId: number) {
    this.getShipping(districtId);
    this.restGhn.getWard(districtId).subscribe(response => {
      this.ward = response.data;
    })
    // this.districtName = districtName;
    this.addressName = this.wardName + ', ' + this.districtName + ', ' + this.provinceName;
  }

  getWardName(wardName: any) {
    this.wardName = wardName;
    this.addressName = this.wardName + ', ' + this.districtName + ', ' + this.provinceName;
  }

}
