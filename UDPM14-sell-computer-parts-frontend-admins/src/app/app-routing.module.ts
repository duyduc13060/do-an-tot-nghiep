import { ListOrdersComponent } from './component/Oder/list-orders/list-orders.component';
import { ListOrderComponent } from './component/Oder/list-order/list-order.component';
import { EditPaymentComponent } from './component/payment/edit-payment/edit-payment.component';
import { AddPaymentComponent } from './component/payment/add-payment/add-payment.component';
import { ListPaymentComponent } from './component/payment/list-payment/list-payment.component';
import { AddImageComponent } from './component/image/add-image/add-image.component';
import { EditImageComponent } from './component/image/edit-image/edit-image.component';
import { ListImageComponent } from './component/image/list-image/list-image.component';
import { EditMainComponent } from './component/Main/edit-main/edit-main.component';
import { AddMainComponent } from './component/Main/add-main/add-main.component';
import { ListMainComponent } from './component/Main/list-main/list-main.component';
import { EditHdComponent } from './component/HD/edit-hd/edit-hd.component';
import { AddHdComponent } from './component/HD/add-hd/add-hd.component';
import { ListHdComponent } from './component/HD/list-hd/list-hd.component';
import { EditPsuComponent } from './component/Psu/edit-psu/edit-psu.component';
import { AddPsuComponent } from './component/Psu/add-psu/add-psu.component';
import { ListPsuComponent } from './component/Psu/list-psu/list-psu.component';
import { EditRamComponent } from './component/Ram/edit-ram/edit-ram.component';
import { RamComponent } from './component/Ram/add-ram/ram.component';
import { EditCaseComponent } from './component/Case/edit-case/edit-case.component';
import { AddCaseComponent } from './component/Case/add-case/add-case.component';
import { ListCaseComponent } from './component/Case/list-case/list-case.component';
import { EditReviewComponent } from './component/Review/edit-review/edit-review.component';
import { EditBrandComponent } from './component/Brands/edit-brand/edit-brand.component';
import { AddBrandComponent } from './component/Brands/add-brand/add-brand.component';
import { EditColorComponent } from './component/color/edit-color/edit-color.component';
import { AddReviewComponent } from './component/Review/add-review/add-review.component';
import { ReviewListComponent } from './component/Review/review-list/review-list.component';
import { AddColorComponent } from './component/color/add-color/add-color.component';

import { EditProductComponent } from './component/product/edit-product/edit-product.component';
import { ListProductComponent } from './component/product/list-product/list-product.component';
import { EditGroupComponentComponent } from './component/Group/edit-group-component/edit-group-component.component';
import { BrandsComponent } from './component/Brands/brands-list/brands.component';
import { AddGroupComponentComponent } from './component/Group/add-group-component/add-group-component.component';
import { ColorComponent } from './component/color/color-list/color.component';
import { GroupComponentComponent } from './component/Group/group-component/group-component.component';
import { AddCategoryComponent } from './component/Category/add-category/add-category.component';

import { LoginComponent } from './component/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListChipComponent } from './component/chip/list-chip/list-chip.component';
import { AddChipComponent } from './component/chip/add-chip/add-chip.component';
import { EditCategoryComponent } from './component/Category/edit-category/edit-category.component';
import { ListFavouriteComponent } from './component/favourite/list-favourite/list-favourite.component';
import { AddFavouriteComponent } from './component/favourite/add-favourite/add-favourite.component';
import { ListCategoryComponent } from './component/Category/list-category/list-category.component';
import { AddProductComponent } from './component/product/add-product/add-product.component';
import { ListStaffComponent } from './component/staff/list-staff/list-staff.component';
import { CreateStaffComponent } from './component/staff/create-staff/create-staff.component';
import { UpdateStaffComponent } from './component/staff/update-staff/update-staff.component';
import { ListRamComponent } from './component/Ram/list-ram/list-ram.component';
import { RegisterComponent } from './component/Auth/register/register.component';
import { EmailRegisterComponent } from './component/Auth/email-register/email-register.component';
import { ForgotPasswordComponent } from './component/Auth/forgot-password/forgot-password.component';
import { InfoOrderComponent } from './component/Oder/info-order/info-order.component';
import { StatisticalComponent } from './component/statistical/statistical.component';
import { ProductDetailComponent } from './component/product-detail/product-detail/product-detail.component';
import { BuyOfflineTestComponent } from './component/Buy-offline/buy-offline-test/buy-offline-test.component';
import { BuyOfflineComponent } from './component/Buy-offline/buy-offline/buy-offline.component';
import { AuthGuard } from './_helper/auth.guard';
import { PublicComponent } from './component/public/public.component';
import { AuthenticatedComponent } from './component/authenticated/authenticated.component';
import { ListAllOrderComponent } from './component/Oder/list-all-order/list-all-order.component';


const routes: Routes=[
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '', component: PublicComponent, children: [
    {
      path: 'login',
      component: LoginComponent
    }
  ] },
  {
    path: '', component: AuthenticatedComponent,
    children: [
      { path: 'add-category', component: AddCategoryComponent, canActivate: [AuthGuard] },
      { path: 'list-category', component: ListCategoryComponent, canActivate: [AuthGuard]},
      { path: 'edit-category/:id', component: EditCategoryComponent, canActivate: [AuthGuard]},

      { path: 'list-order', component: ListOrderComponent, canActivate: [AuthGuard]},
      { path: 'list-orders', component: ListOrdersComponent, canActivate: [AuthGuard]},
      { path: 'info-order/:id', component: InfoOrderComponent, canActivate: [AuthGuard]},
      { path: 'all-order', component: ListAllOrderComponent, canActivate: [AuthGuard]},


      { path: 'statistical', component: StatisticalComponent, canActivate: [AuthGuard]},

      { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard]},
      { path: 'list-product', component: ListProductComponent, canActivate: [AuthGuard]},
      { path: 'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard]},

      { path: 'ram', component: ListRamComponent, canActivate: [AuthGuard]},
      { path: 'ram/create', component: RamComponent, canActivate: [AuthGuard]},
      { path: 'ram/update/:id', component: EditRamComponent, canActivate: [AuthGuard]},

      { path:'register', component: RegisterComponent, canActivate: [AuthGuard]},
      { path:'emailRegister', component: EmailRegisterComponent, canActivate: [AuthGuard]},
      { path:'forgotPassword', component: ForgotPasswordComponent, canActivate: [AuthGuard]},

      { path: 'hd', component: ListHdComponent, canActivate: [AuthGuard]},
      { path: 'hd/create', component: AddHdComponent, canActivate: [AuthGuard]},
      { path: 'hd/update/:id', component: EditHdComponent, canActivate: [AuthGuard]},

      { path: 'psu', component: ListPsuComponent, canActivate: [AuthGuard]},
      { path: 'psu/create', component: AddPsuComponent, canActivate: [AuthGuard]},
      { path: 'psu/update/:id', component: EditPsuComponent, canActivate: [AuthGuard]},

      { path: 'main', component: ListMainComponent, canActivate: [AuthGuard]},
      { path: 'main/create', component: AddMainComponent, canActivate: [AuthGuard]},
      { path: 'main/update/:id', component: EditMainComponent, canActivate: [AuthGuard]},

      { path: 'case', component: ListCaseComponent , canActivate: [AuthGuard]},
      { path: 'case/create', component: AddCaseComponent , canActivate: [AuthGuard]},
      { path: 'case/update/:id', component: EditCaseComponent , canActivate: [AuthGuard]},

      { path: 'groupcomponent', component: GroupComponentComponent , canActivate: [AuthGuard]},
      { path: 'groupcomponent/add', component: AddGroupComponentComponent, canActivate: [AuthGuard]},
      { path: 'groupcomponent/:id', component: EditGroupComponentComponent , canActivate: [AuthGuard]},

      { path: 'brand', component: BrandsComponent, canActivate: [AuthGuard]},
      { path: 'brand/add', component: AddBrandComponent, canActivate: [AuthGuard]},
      { path: 'brand/edit/:id', component: EditBrandComponent, canActivate: [AuthGuard]},

      { path: 'color', component: ColorComponent , canActivate: [AuthGuard]},
      { path: 'color/add', component: AddColorComponent , canActivate: [AuthGuard]},
      { path: 'color/edit/:id', component: EditColorComponent , canActivate: [AuthGuard]},

      { path: 'review/list', component: ReviewListComponent , canActivate: [AuthGuard]},
      { path: 'review/create/:id', component: AddReviewComponent , canActivate: [AuthGuard]},
      { path: 'review/update/:id', component: EditReviewComponent , canActivate: [AuthGuard]},

      { path: 'list-image', component: ListImageComponent, canActivate: [AuthGuard]},
      { path: 'add-image', component: AddImageComponent, canActivate: [AuthGuard]},
      { path: 'edit-image/:id', component: EditImageComponent, canActivate: [AuthGuard]},

      { path: 'list-payment', component: ListPaymentComponent, canActivate: [AuthGuard]},
      { path: 'add-payment', component: AddPaymentComponent, canActivate: [AuthGuard]},
      { path: 'edit-payment/:id', component: EditPaymentComponent, canActivate: [AuthGuard]},



      // { path: 'users', component: UsersComponent },
      { path: 'add-chip', component: AddChipComponent, canActivate: [AuthGuard]},
      { path: 'list-chip', component: ListChipComponent, canActivate: [AuthGuard]},
      { path: 'list-favourite', component: ListFavouriteComponent, canActivate: [AuthGuard]},
      { path: 'add-favourite', component: AddFavouriteComponent, canActivate: [AuthGuard]},
      { path: 'list-staff', component: ListStaffComponent, canActivate: [AuthGuard]},
      { path: 'add-staff', component: CreateStaffComponent, canActivate: [AuthGuard]},
      { path: 'update-staff/:id', component: UpdateStaffComponent, canActivate: [AuthGuard]},

      { path: 'buy-offline-test', component: BuyOfflineTestComponent, canActivate: [AuthGuard]},
      { path: 'buy-offline', component: BuyOfflineComponent, canActivate: [AuthGuard]},
      { path: 'product-detail/:id', component: ProductDetailComponent, canActivate: [AuthGuard]},



    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
