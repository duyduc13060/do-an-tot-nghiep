import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { Staff } from 'src/app/_model/Staff';
import { StaffService } from 'src/app/_service/staff-service/staff.service';

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.css']
})
export class ListStaffComponent implements OnInit {

  staffs: Staff[] = [];
  confirmMessage= '';
  deleteId!: number;

  constructor(private router: Router,
     private staffSer: StaffService, private modalService: NgbModal, private toast: NgToastService) { }

  ngOnInit(): void {
    this.showAllStaff();
  }

  showAllStaff() {
    this.staffSer.getAllStaff()
    .subscribe(data => {
      this.staffs = data.data;
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

  deleteStaff(){
    if(this.deleteId != null){
      this.staffSer.deleteStaff(this.deleteId)
      .subscribe(data => {
        this.modalService.dismissAll();
        this.toast.success({ summary: 'Xóa nhân viên thành công', duration: 3000 });
        this.ngOnInit();
      });
    }
  }

}
