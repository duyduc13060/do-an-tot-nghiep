import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PsuService } from './../../../_service/psu-service/psu.service';
import { SessionStorageService } from './../../../services/session-storage.service';
import { ToastrService } from 'ngx-toastr';
import { ProductApiService } from './../../../_service/product-service/product-api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-psu',
  templateUrl: './list-psu.component.html',
  styleUrls: ['./list-psu.component.css']
})
export class ListPsuComponent implements OnInit {
  psu: any =[];
  confirmMessage= '';
  deleteId!: number;
  constructor(
     private ProductApiService: ProductApiService,
     private toastr: ToastrService,
     private sessionService: SessionStorageService,
     private PsuService: PsuService,
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
    this.PsuService.getAll().subscribe(data=>{
      this.psu=data.data;
      console.log(data);
    })

    }
    confirmDeleteStaff(confirmDialog: TemplateRef<any>, id: number){
      this.confirmMessage = `Do you want to delete?`;
      this.deleteId = id;
      this.modalService.open(confirmDialog,
        {ariaDescribedBy:'modal-basic-title'}).result.then((result)=>{
        }).catch((err)=>{

        })
    }

    deletepsu(){
      if(this.deleteId != null){
        this.PsuService.delete(this.deleteId)
        .subscribe(data => {
          this.modalService.dismissAll();
          this.toast.success({ summary: 'Xóa psu thành công', duration: 3000 });
          this.ngOnInit();
        });
      }
    }

}
