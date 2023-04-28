import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from '../../../services/session-storage.service';
import { ToastrService } from 'ngx-toastr';

import { Component, OnInit, TemplateRef } from '@angular/core';
import { ColorService } from 'src/app/_service/color-service/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  confirmMessage= '';
  deleteId!: number;
  color: any =[];
  constructor(private ColorService: ColorService,
     private toastr: ToastrService,
     private sessionService: SessionStorageService,
     private modalService: NgbModal,
     private toast: NgToastService) { }

  ngOnInit(): void {
  this.getAll();
  }



  logout() {
    this.sessionService.deleteSession();
    window.location.href = '/login';
  }

  //lay du lieu tu database
  getAll() {
    this.ColorService.getAll().subscribe(data=>{
      this.color=data.data;
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

    delete(){
      if(this.deleteId != null){
        this.ColorService.delete(this.deleteId)
        .subscribe(data => {
          this.modalService.dismissAll();
          this.toast.success({ summary: 'Xóa color thành công', duration: 3000 });
          this.ngOnInit();
        });
      }
    }

}
