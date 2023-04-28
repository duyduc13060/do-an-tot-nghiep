import { MainService } from './../../../_service/main-service/main.service';
import { HdService } from './../../../_service/hd-service/hd.service';
import { VgaService } from './../../../_service/vga-service/vga.service';
import { RamService } from './../../../_service/ram-service/ram.service';
import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChipApiService } from './../../../_service/chip-service/chip-api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ToastrService } from 'ngx-toastr';
import { ProductApiService } from 'src/app/_service/product-service/product-api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-main',
  templateUrl: './list-main.component.html',
  styleUrls: ['./list-main.component.css']
})
export class ListMainComponent implements OnInit {

  main: any =[];

  confirmMessage= '';
  deleteId!: number;
  constructor(
     private toastr: ToastrService,
     private sessionService: SessionStorageService,
     private modalService: NgbModal,
     private toast: NgToastService,
     private MainService: MainService
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
    this.MainService.getAllMain(0,50).subscribe(data=>{
      this.main=data.data;


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

            this.MainService.delete(this.deleteId)
            .subscribe(data => {
              this.modalService.dismissAll();
              this.toast.success({ summary: 'Xóa main thành công', duration: 3000 });
              this.ngOnInit();
            });



      }
    }

}
