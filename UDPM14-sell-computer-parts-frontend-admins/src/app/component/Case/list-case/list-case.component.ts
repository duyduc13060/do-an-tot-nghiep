import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CasesService } from './../../../_service/Cases-service/cases.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ToastrService } from 'ngx-toastr';
import { ProductApiService } from 'src/app/_service/product-service/product-api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-case',
  templateUrl: './list-case.component.html',
  styleUrls: ['./list-case.component.css']
})
export class ListCaseComponent implements OnInit {
  confirmMessage= '';
  deleteId!: number;
  cases: any =[];
  constructor(
     private ProductApiService: ProductApiService,
     private toastr: ToastrService,
     private sessionService: SessionStorageService,
     private CasesService: CasesService,
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
    this.CasesService.getAll().subscribe(data=>{
      this.cases=data.data;
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
        this.CasesService.delete(this.deleteId)
        .subscribe(data => {
          this.modalService.dismissAll();
          this.toast.success({ summary: 'Xóa psu thành công', duration: 3000 });
          this.ngOnInit();
        });
      }
    }

}
