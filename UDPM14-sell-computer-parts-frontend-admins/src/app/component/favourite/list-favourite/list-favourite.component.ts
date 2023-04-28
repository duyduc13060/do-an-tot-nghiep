import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { Favourite } from 'src/app/_model/favourite';
import { FavouriteService } from 'src/app/_service/favourite-service/favourite.service';

@Component({
  selector: 'app-list-favourite',
  templateUrl: './list-favourite.component.html',
  styleUrls: ['./list-favourite.component.css']
})
export class ListFavouriteComponent implements OnInit {

  favs: Favourite[] = [];
  confirmMessage= '';
  deleteId!: number;

  constructor(private router: Router, private favSer: FavouriteService, private modalService: NgbModal, private toast: NgToastService) { }

  ngOnInit(): void {
    this.showAllFavourite();
  }

  showAllFavourite() {
    this.favSer.getAllFavoutite()
    .subscribe(data => {
      this.favs = data.data;
    })
  }

  confirmDeleteFavourite(confirmDialog: TemplateRef<any>, id: number){
    this.confirmMessage = `Do you want to delete ` + id + `?`;
    this.deleteId = id;
    this.modalService.open(confirmDialog,
      {ariaDescribedBy:'modal-basic-title'}).result.then((result)=>{
      }).catch((err)=>{

      })
  }

  deleteFavourite(){
    if(this.deleteId != null){
      this.favSer.deleteFavourite(this.deleteId).subscribe(data => {
        this.modalService.dismissAll();
        this.toast.success({ summary: 'Xóa favourite thành công', duration: 3000 });
        this.ngOnInit();
      });
    }
  }

}
