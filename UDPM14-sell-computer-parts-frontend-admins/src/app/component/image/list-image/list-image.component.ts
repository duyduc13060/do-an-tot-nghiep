import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ImageApiService } from 'src/app/_service/image-service/image-api.service';

@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css']
})
export class ListImageComponent implements OnInit {

  isLoading: boolean = true;
  images: any[] = [];
  confirmMessage = '';
  deleteId!: number;

  page = 0;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];

  constructor(
    private rest: ImageApiService,
    private modalService: NgbModal,
    private toast: NgToastService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getRequestParams(page: number, pageSize: number) {
    let params: any = {};

    if (page) {
      params[`page`] = page;
    }

    if (pageSize) {
      params[`page-number`] = pageSize;
    }

    return params;

  }

  getAll(){
    this.isLoading = true;
    const params = this.getRequestParams(this.page, this.pageSize);
    console.log(params)
    this.rest.getAll(params).subscribe(data=>{
      this.isLoading = false;
      const totalItem = data.pagination.totalItem;
      this.images = data.data;
      this.count = totalItem;
    })
  }

  handlePageChange(event: number){
    this.page = event;
    this.getAll();
  }

  handlePageSizeChange(event: any){
    this.pageSize = event.target.value;
    this.page = 0;
    this.getAll();
  }


  confirmDeleteCategory(confirmDialog: TemplateRef<any>, id: number, name: string) {
    this.confirmMessage = `Do you want to delete ${name} ?`;
    this.deleteId = id;
    this.modalService.open(confirmDialog,
      { ariaDescribedBy: 'modal-basic-title' }).result.then((result) => {
      }).catch((err) => {

      })
  }

  deleteImage() {
    this.isLoading = true;
    if (this.deleteId != null) {
      this.rest.delete(this.deleteId).subscribe(data => {
        this.isLoading = false;
        this.modalService.dismissAll();
        this.ngOnInit();
        this.toast.success({ summary: 'Delete category successfuly', duration: 3000 });
      })

    }
  }



}
