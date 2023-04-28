import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RamService } from './../../../_service/ram-service/ram.service';
import { SessionStorageService } from './../../../services/session-storage.service';
import { ToastrService } from 'ngx-toastr';
import { ProductApiService } from './../../../_service/product-service/product-api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-ram',
  templateUrl: './list-ram.component.html',
  styleUrls: ['./list-ram.component.css']
})
export class ListRamComponent implements OnInit {

  confirmMessage= '';
  deleteId!: number;
  ram: any =[];
  constructor(
     private ProductApiService: ProductApiService,
     private toastr: ToastrService,
     private modalService: NgbModal,
     private sessionService: SessionStorageService,
     private RamService: RamService,
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
    this.RamService.getAll().subscribe(data=>{
      this.ram=data.data;
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

    deletepsu(){
      if(this.deleteId != null){
        this.RamService.delete(this.deleteId)
        .subscribe(data => {
          this.modalService.dismissAll();
          this.toast.success({ summary: 'Xóa thành công', duration: 3000 });
          this.ngOnInit();
        });
      }
    }
}
