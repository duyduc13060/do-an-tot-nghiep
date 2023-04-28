import { Component, OnInit, TemplateRef } from '@angular/core';
import { VgaService } from 'src/app/_service/vga-service/vga.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vga-list',
  templateUrl: './vga-list.component.html',
  styleUrls: ['./vga-list.component.css']
})
export class VgaListComponent implements OnInit {
  vga: any[] = [];
  confirmMessage = '';
  deleteId!: number;
  title = '';
  page = 0;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  constructor(
    private rest: VgaService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getAllVga();
  }

  getRequestParams(searchName: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchName) {
      params[`name`] = searchName;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`page-number`] = pageSize;
    }

    return params;
  }

  getAllVga() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.rest.getAllVga().subscribe(data => {
      const totalItem = data.pagination.totalItem;
      this.vga = data.data;
      this.count = totalItem;
      console.log("1");
      console.log(data);
    },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number) {
    this.page = event;
    this.getAllVga();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.getAllVga();
  }

  searchTitle(): void {
    this.page = 0;
    this.getAllVga();
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
      this.rest.delete(this.deleteId).subscribe(data => {
        this.modalService.dismissAll();
        this.ngOnInit();
      })
    }
  }

}
