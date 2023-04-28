import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from '../../../services/session-storage.service';
import { ToastrService } from 'ngx-toastr';

import { Component, OnInit, TemplateRef } from '@angular/core';
import { BrandService } from 'src/app/_service/Brand-service/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  confirmMessage= '';
  deleteId!: number;
  brands: any = [];
  constructor(private BrandService: BrandService,
     private toastr: ToastrService,
     private sessionService: SessionStorageService,
     private modalService: NgbModal,
     private toast: NgToastService
     ) { }


  ngOnInit(): void {
    this.getAll();
  }

  logout() {
    this.sessionService.deleteSession();
    window.location.href = '/login';
  }

  //lay du lieu tu database
  getAll() {
    this.BrandService.getAll().subscribe(data => {
      this.brands = data.data;
      console.log(data);
    })

  }
  confirmDeleteStaff(confirmDialog: TemplateRef<any>, id: number){
    this.confirmMessage = `Bạn có chắc chắn muốn xoá`;
    this.deleteId = id;
    this.modalService.open(confirmDialog,
      {ariaDescribedBy:'modal-basic-title'}).result.then((result)=>{
      }).catch((err)=>{

      })
  }

  deleteBranch(){
    if(this.deleteId != null){
      this.BrandService.delete(this.deleteId)
      .subscribe(data => {
        this.modalService.dismissAll();
        this.toast.success({ summary: 'Xóa thành công', duration: 3000 });
        this.ngOnInit();
      });
    }
  }
}
