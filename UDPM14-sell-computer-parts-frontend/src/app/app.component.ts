/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { GroupComponetModel } from './Model/GroupComponentModel';
import { CartService } from './_service/cart-service/cart.service';
import { CategoryService } from './_service/catergory-service/category.service';
import { GroupService } from './_service/group-service/group.service';
import { TokenStorageService } from './_service/token-storage-service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sell Computer';

  groups: GroupComponetModel[] = [];
  cateByGroupId: any = [];
  quantityCart!: number;

  constructor(private router: Router,
              private toast: NgToastService,
              private tokenStorage: TokenStorageService,
              private groupSer: GroupService,
              private cartSer: CartService,
              private cateSer: CategoryService,) { }

  ngOnInit(): void {
    this.getAllGroup();
    this.getSumTotal();
  }

  getUser() {
    return this.tokenStorage.getUser();
  }

  logout() {
    this.tokenStorage.singOut();
    this.toast.success({ summary: 'Đăng Xuất Thành Công', duration: 3000 });
    this.router.navigate(["login"]);
  }

  getAllGroup() {
    this.groupSer.getAllGroupComponet()
    .subscribe(data => {
      this.groups = data.data;
      console.log(data.data)
    })
  }

  getSumTotal() {
    this.cartSer.getSumTotal()
      .subscribe(data => {
        this.quantityCart = data.data.quantityCart;
    });
  }

  showCategoryByGroupId(idG: number){
    this.cateSer.getAllCategoryByGroupId(idG)
    .subscribe(data=>{
      this.cateByGroupId = data.data;
      console.log(data.data);
    })
  }

  reloadCurrentPage() {
    window.location.reload();
   }

}
