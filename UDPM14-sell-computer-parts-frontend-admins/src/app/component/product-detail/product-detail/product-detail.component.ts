import { Component, OnInit } from '@angular/core';
import { ImageApiService } from '../../../_service/image-service/image-api.service';
import { ActivatedRoute } from '@angular/router';
import { ProductApiService } from '../../../_service/product-service/product-api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {


  productImage: any[] = [];
  categoryId: any;
  proCates:any;

  constructor(
    private restImage: ImageApiService,
    private activatedRoute: ActivatedRoute,
    private proSer: ProductApiService
  ) { }

  ngOnInit() {
    this.showListProductImage();
  }

  showListProductImage() {
    let id = +this.activatedRoute.snapshot.params['id'];
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

}
