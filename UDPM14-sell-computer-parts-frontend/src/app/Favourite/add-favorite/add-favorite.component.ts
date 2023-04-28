import { NgToastService } from 'ng-angular-popup';
import { TokenStorageService } from './../../_service/token-storage-service/token-storage.service';
import { ProductModel } from './../../Model/ProductModel';
import { FavouriteModel } from './../../Model/FavouriteModel';
import { FavouriteService } from './../../_service/favourite-service/favourite.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-favorite',
  templateUrl: './add-favorite.component.html',
  styleUrls: ['./add-favorite.component.css']
})
export class AddFavoriteComponent implements OnInit {

  product_id!: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenSer: TokenStorageService,
    private toast: NgToastService,
    private rest: FavouriteService,
  ) { }

  ngOnInit() {
    this.createFavourite();
  }

  createFavourite() {
    let id = +this.activatedRoute.snapshot.params['id'];

    const username = this.tokenSer.getUser();
    if (username == null) {
      this.toast.error({ summary: 'Bạn chưa đăng nhập!', duration: 3000 });
    } else {
      this.rest.addFavourite(id).subscribe(data => {
        console.log(data.data);
        this.product_id = data.data.product_id;
        this.toast.success({ summary: 'Thêm sản phẩm vào yêu thích thành công!', duration: 3000 });
        this.router.navigate(['/product-detail', this.product_id]);
      }, error => this.toast.error({ summary: 'Thêm sản phẩm vào yêu thích thất bại!', duration: 3000 }));

    }

  }


}
