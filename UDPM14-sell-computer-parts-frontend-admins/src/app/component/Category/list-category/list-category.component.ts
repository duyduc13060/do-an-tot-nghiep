import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../../_service/category-service/category.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { data } from 'jquery';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  isLoading: boolean = true;
  categories: any[] = [];
  confirmMessage = '';
  deleteId!: number;

  page = 0;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];

  constructor(
    private rest: CategoryService,
    private modalService: NgbModal,
    private toast: NgToastService,
  ) {

  }

  ngOnInit() {
    this.getAllCategory();
  }


  confirmDeleteCategory(confirmDialog: TemplateRef<any>, id: number, name: string) {
    this.confirmMessage = `Do you want to delete ${name} ?`;
    this.deleteId = id;
    this.modalService.open(confirmDialog,
      { ariaDescribedBy: 'modal-basic-title' }).result.then((result) => {
      }).catch((err) => {

      })
  }

  deleteCategory() {
    if (this.deleteId != null) {
      this.rest.deleteCategory(this.deleteId).subscribe(data => {
        this.modalService.dismissAll();
        this.ngOnInit();
        this.toast.success({ summary: 'Delete category successfuly', duration: 3000 });
      })

    }
  }


  getAllCategory() {
    this.isLoading = true;
    this.rest.getAllCategory(0, 999).subscribe(data => {
      this.categories = data.data;
      this.isLoading = false;
      console.log(data.data);
    })
  }

  // pagination //

  getRequestParams(page: number, pageSize: number) {
    let params: any = {};

    if (page) {
      params[`page`] = page;
    }

    if (pageSize) {
      params[`page-number`]
    }

    return params;

  }

  getAllCategoryAndPage() {
    const params = this.getRequestParams(this.page, this.pageSize);

    this.rest.getAllCategoryAndPage(params).subscribe(response => {
      const totalItem = response.pagination.totalItem;
      this.categories = response.data;
      this.count = totalItem;
    },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number){
    this.page = event;
    this.getAllCategoryAndPage();
  }

  handlePageSizeChange(event: any){
    this.pageSize = event.target.value;
    this.page = 0;
    this.getAllCategory();
  }

  filterByStatusProduct(e: any) {
    let condition = e.target.value;
    if (condition) {
      this.rest.getAllCategoryByStatus(condition).subscribe(data => {

        const totalItem = data.pagination.totalItem;
        this.categories = data.data;
        // this.count = totalItem;
        console.log(data);
      },
        error => {
          this.toast.error({ summary: 'Không tìm thấy sản phẩm!' })
        });
    } else {
      this.toast.error({ summary: 'Không tìm thấy sản phẩm!' })
    }
  }




}
