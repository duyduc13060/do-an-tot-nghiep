import { ProductDetailRamComponent } from './product-detail/product-detail-ram/product-detail-ram.component';
import { AddFavoriteComponent } from './Favourite/add-favorite/add-favorite.component';
import { ListProductRamComponent } from './Product/list-product-ram/list-product-ram.component';
import { ListProductChipComponent } from './Product/list-product-chip/list-product-chip.component';
import { LoginComponent } from './login/login.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './Auth/register/register.component';
import { EmailRegisterComponent } from './Auth/email-register/email-register.component';
import { NgToastModule } from 'ng-angular-popup';
import { ForgotPasswordComponent } from './Auth/forgot-password/forgot-password.component';
import { UpdateProfileComponent } from './Profile/update-profile/update-profile.component';
import { ChangePasswordComponent } from './Profile/change-password/change-password.component';

import { ListFavouriteComponent } from './Favourite/list-favourite/list-favourite.component';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { CartComponent } from './cart/cart.component';
import { ListProductCaseComponent } from './Product/list-product-case/list-product-case.component';
import { ProductDetailComponent } from './product-detail/product-detail/product-detail.component';
import { ProductDetailCaseComponent } from './product-detail/product-detail-case/product-detail-case.component';
import { ProductDetailChipComponent } from './product-detail/product-detail-chip/product-detail-chip.component';
import { ProductCategoryComponent } from './Product/product-category/product-category.component';
import { ListProductHdComponent } from './Product/list-product-hd/list-product-hd.component';
import { ListProductPsuComponent } from './Product/list-product-psu/list-product-psu.component';
import { ListProductVgaComponent } from './Product/list-product-vga/list-product-vga.component';
import { ProductDetailHdComponent } from './product-detail/product-detail-hd/product-detail-hd.component';
import { ProductDetailPsuComponent } from './product-detail/product-detail-psu/product-detail-psu.component';
import { ProductDetailVgaComponent } from './product-detail/product-detail-vga/product-detail-vga.component';
import { ListOrderComponent } from './Order/list-order/list-order.component';
import { ListOrderConfirmComponent } from './Order/list-order-confirm/list-order-confirm.component';
import { ListOrderShippingComponent } from './Order/list-order-shipping/list-order-shipping.component';
import { ListOrderCancelComponent } from './Order/list-order-cancel/list-order-cancel.component';
import { ListOrderShipSuccessComponent } from './Order/list-order-ship-success/list-order-ship-success.component';
import { ListProductComponent } from './Product/list-product/list-product.component';
import { ListOrderDetailComponent } from './OrderDetail/list-order-detail/list-order-detail.component';
import { GhnInterceptor } from './_helpers/ghn.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CheckoutComponent,
    ContactComponent,
    CartComponent,
    RegisterComponent,
    EmailRegisterComponent,
    ForgotPasswordComponent,
    UpdateProfileComponent,
    ChangePasswordComponent,
    LoginComponent,
    ListFavouriteComponent,
    ListProductCaseComponent,
    ListProductChipComponent,
    ListProductRamComponent,
    ListProductHdComponent,
    ListProductPsuComponent,
    ListProductVgaComponent,
    ProductDetailComponent,
    ProductDetailCaseComponent,
    ProductDetailChipComponent,
    ProductDetailRamComponent,
    ProductDetailHdComponent,
    ProductDetailPsuComponent,
    ProductDetailVgaComponent,
    AddFavoriteComponent,
    ProductCategoryComponent,
    ListOrderComponent,
    ListOrderConfirmComponent,
    ListOrderShippingComponent,
    ListOrderCancelComponent,
    ListOrderShipSuccessComponent,
    ListProductComponent,
    ListOrderDetailComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgToastModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule,
    MatTabsModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    // NgSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GhnInterceptor,
      multi: true,
    },
    // {
    //   provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    //   useValue: {appearance: 'outline'}
    // },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
