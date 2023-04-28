import { data } from 'jquery';
import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from '../../../services/session-storage.service';
import { ToastrService } from 'ngx-toastr';

import { Component, OnInit, TemplateRef } from '@angular/core';
import { GroupComponentService } from 'src/app/_service/group-component/group-component.service';

@Component({
  selector: 'app-group-component',
  templateUrl: './group-component.component.html',
  styleUrls: ['./group-component.component.css']
})
export class GroupComponentComponent implements OnInit {
  group_component: any =[];
  confirmMessage= '';
  deleteId!: number;
  constructor(private GroupComponentService: GroupComponentService,
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


  getAll() {
    this.GroupComponentService.getAll().subscribe(data=>{
      this.group_component=data.data;
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
        this.GroupComponentService.delete(this.deleteId)
        .subscribe(data => {
          this.modalService.dismissAll();
          this.toast.success({ summary: 'Xóa group thành công', duration: 3000 });
          this.ngOnInit();
        });
      }
    }
}
