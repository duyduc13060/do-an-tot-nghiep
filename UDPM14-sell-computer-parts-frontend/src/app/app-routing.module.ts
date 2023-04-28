import { AddFavoriteComponent } from './Favourite/add-favorite/add-favorite.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailRegisterComponent } from './Auth/email-register/email-register.component';
import { ForgotPasswordComponent } from './Auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './Auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { ListFavouriteComponent } from './Favourite/list-favourite/list-favourite.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './Profile/change-password/change-password.component';
import { UpdateProfileComponent } from './Profile/update-profile/update-profile.component';
import { ProductCategoryComponent } from './Product/product-category/product-category.component';
import { ProductDetailComponent } from './product-detail/product-detail/product-detail.component';
import { ListOrderComponent } from './Order/list-order/list-order.component';
import { ListOrderCancelComponent } from './Order/list-order-cancel/list-order-cancel.component';
import { ListOrderShippingComponent } from './Order/list-order-shipping/list-order-shipping.component';
import { ListOrderShipSuccessComponent } from './Order/list-order-ship-success/list-order-ship-success.component';
import { ListOrderConfirmComponent } from './Order/list-order-confirm/list-order-confirm.component';
import { ListProductComponent } from './Product/list-product/list-product.component';
import { ListOrderDetailComponent } from './OrderDetail/list-order-detail/list-order-detail.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},

  {path:'product-detail/:id', component: ProductDetailComponent},
  {path:'productCate/:id', component: ProductCategoryComponent},
  {path:'productCate', component: ProductCategoryComponent},
  {path:'ListProduct', component: ListProductComponent},

  {path:'add-favorite/:id', component: AddFavoriteComponent},
  {path:'order-detail/:id', component: ListOrderDetailComponent},

  {path:'cart', component: CartComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'contact', component: ContactComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'emailRegister', component: EmailRegisterComponent},
  {path:'forgotPassword', component: ForgotPasswordComponent},
  {path:'changePassword', component: ChangePasswordComponent},
  {path:'updateProfile', component: UpdateProfileComponent},
  {path:'listFavourite', component: ListFavouriteComponent},

  {path:'list-order', component: ListOrderComponent},
  {path:'list-order-cancel', component: ListOrderCancelComponent},
  {path:'list-order-shipping', component: ListOrderShippingComponent},
  {path:'list-order-ship-success', component: ListOrderShipSuccessComponent},
  {path:'list-order-confirm', component: ListOrderConfirmComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
