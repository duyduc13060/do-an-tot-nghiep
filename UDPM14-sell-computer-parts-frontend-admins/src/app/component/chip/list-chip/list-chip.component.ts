import { Component, OnInit, TemplateRef } from '@angular/core';
import { Chip } from '../../../_model/chip';
import { ChipApiService } from '../../../_service/chip-service/chip-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import {data} from "jquery";

@Component({
  selector: 'app-list-chip',
  templateUrl: './list-chip.component.html',
  styleUrls: ['./list-chip.component.css']
})
export class ListChipComponent implements OnInit {

  chips!: Chip[];
  chip :Chip = new Chip();
  id! :number;

  deleteId! :number;
  confirmMessage= '';

  page = 0;
  count = 0;
  pageSize = 10;
  pageSizes = [10,20,30];

  constructor(
    private rest: ChipApiService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
   ) {

     }

  ngOnInit() {
   this.getAllchipAndPage();
  }

  confirmDeleteChip(confirmDialog: TemplateRef<any>, id: number, name: string){
    this.confirmMessage = `Do you want to delete ${name} ?`;
    this.deleteId = id;
    this.modalService.open(confirmDialog,
      {ariaDescribedBy:'modal-basic-title'}).result.then((result)=>{
      }).catch((err)=>{

      })
  }

  deleteChip(){
    if(this.deleteId != null){
      this.rest.delete(this.deleteId).subscribe(data=>{
        this.modalService.dismissAll();
        this.ngOnInit();
      })
    }
  }

  getChip() {
    this.rest.getAll().subscribe(data => {
      this.chips = data.data;
    })
  }

  finishAndAlert(message: string){
    this.ngOnInit();
  }

  /// page

  getRequestParams(page: number, pageSize: number){
    let params: any ={};

    if(page){
      params[`page`] = page;
    }

    if(pageSize){
      params[`page-number`] = pageSize;
    }

    return params;
  }


  getAllchipAndPage(){
    const params = this.getRequestParams(this.page,this.pageSize);

    this.rest.getAllAndPage(params).subscribe(response=>{
      const totalItems = response.pagination.totalItem;
      this.chips = response.data;
      console.log(response.data)
      this.count = totalItems;
    },
    error => {
      console.log(error);
    });

  }

  handlePagechange(event: number){
    this.page = event;
    this.getAllchipAndPage();
  }

  handlePageSizeChange(event: any){
    this.pageSize = event.target.value;
    this.page = 0;
    this.getAllchipAndPage();
  }



}
