import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ToastrService } from 'ngx-toastr';
import { ReviewService } from './../../../_service/review-service/review.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  reviewService: any =[];
  constructor(private ReviewService: ReviewService,
     private toastr: ToastrService,
      private sessionService: SessionStorageService) { }

  ngOnInit(): void {
this.getAll();
  }



  logout() {
    this.sessionService.deleteSession();
    window.location.href = '/login';
  }

  //lay du lieu tu database
  getAll() {
    this.ReviewService.getAll().subscribe(data=>{
      this.reviewService=data.data;
      console.log(data);
    })

    }

}
