import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductApiService } from 'src/app/_service/product-service/product-api.service';
import { FormGroup } from '@angular/forms';
import { HdService } from './../../../_service/hd-service/hd.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-hd',
  templateUrl: './list-hd.component.html',
  styleUrls: ['./list-hd.component.css']
})
export class ListHdComponent implements OnInit {

  hd: any =[];
  confirmMessage= '';
  deleteId!: number;
  constructor(
     private ProductApiService: ProductApiService,
     private toastr: ToastrService,
     private sessionService: SessionStorageService,
     private HdService: HdService,
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
    this.HdService.getAll().subscribe(data=>{
      this.hd=data.data;
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

    deletehd(){
      if(this.deleteId != null){
        this.HdService.delete(this.deleteId)
        .subscribe(data => {
          this.modalService.dismissAll();
          this.toast.success({ summary: 'Xóa hd thành công', duration: 3000 });
          this.ngOnInit();
        });
      }
    }

}
