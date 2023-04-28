import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductApiService } from '../../../_service/product-service/product-api.service';
import { CategoryService } from 'src/app/_service/category-service/category.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: any[] = [];
  confirmMessage = '';

  deleteId!: number;
  isLoading: boolean = false;

  categories: any[] = [];

  title = '';
  page = 0;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];


  constructor(
    private rest: ProductApiService,
    private modalService: NgbModal,
    private restC: CategoryService,
    private toast: NgToastService,
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProduct();
    // this.getAll();
  }



  // pagination

  getRequestParams(searchName: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchName) {
      params[`name`] = searchName;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`page-size`] = pageSize;
    }

    return params;
  }
//  getAll(){
//   this.rest.getAllProduct(0,50).subscribe(data => {
//     const totalItem = data.pagination.totalItem;
//     this.products = data.data;
//     this.count = totalItem;
//     console.log(data);
//   },
//     error => {
//       console.log(error);
//     });
//  }
  getAllCategory() {
    this.isLoading = true;
    this.restC.getAllCategory(0, 999).subscribe(data => {
      this.isLoading = false;
      this.categories = data.data;
    })
  }

  getAllProduct() {

    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.rest.getAllProductAndSearch(params).subscribe(data => {
      const totalItem = data.pagination.totalItem;
      this.products = data.data;
      this.count = totalItem;
      // console.log(data);
    },
      error => {
        console.log(error);
      });
  }


  handlePageChange(event: number) {
    this.page = event;
    this.getAllProduct();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.getAllProduct();
  }

  searchTitle(): void {
    this.page = 0;
    this.getAllProduct();
  }

  //////////////
  filter(e: any) {
    let condition = e.target.value;

    if (condition) {
      this.rest.getAllProduct_byCate(condition, 0, 50).subscribe(data => {
        const totalItem = data.pagination.totalItem;
        this.products = data.data;
        this.count = totalItem;
        console.log(data);
      })
    }

  }

  // tìm kiếm sản phẩm theo mã code,tên,giá
  filterByProduct(e: any) {
    let condition = e.target.value;
    if (condition) {
      this.rest.getAllProductsAndSearch(condition,0,10).subscribe(data => {
        this.products = data.data;
        console.log(data);
      },
        error => {
          this.toast.error({ summary: 'Không tìm thấy sản phẩm!' })
        });
    } else {
      this.getAllProduct();
    }
  }

  filterProductByStatus(e: any) {
    let condition = e.target.value;
    if (condition) {
      this.rest.getProductByStatus(condition,0,10).subscribe(data => {
        this.products = data.data;
        console.log(data);
      },
        error => {
          this.toast.error({ summary: 'Không tìm thấy sản phẩm!' })
        });
    } else {
      this.getAllProduct();
    }
  }

  confirmDeleteProduct(confirmDialog: TemplateRef<any>, id: number, name: string) {
    this.confirmMessage = `Do you want to delete ${name} ?`;
    this.deleteId = id;
    this.modalService.open(confirmDialog,
      { ariaDescribedBy: 'modal-basic-title' }).result.then((result) => {
      }).catch((err) => {

      })
  }

  deleteProduct() {
    if (this.deleteId != null) {
      this.rest.deletteProduct(this.deleteId).subscribe(data => {
        this.modalService.dismissAll();
        this.ngOnInit();
      })
    }
  }

}
