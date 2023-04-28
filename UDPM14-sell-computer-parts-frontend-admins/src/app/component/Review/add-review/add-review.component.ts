import { data } from 'jquery';
import { ReviewService } from './../../../_service/review-service/review.service';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { ProductApiService } from 'src/app/_service/product-service/product-api.service';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  product: any;
  AddForm: FormGroup;
  id!:number;
  grSelect:any;
  selected:any;
  user:any;
  constructor(
    private ProductApiService: ProductApiService,
    private ReviewService: ReviewService,
    private UserService: UserService,
    private messageService: MessageService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private title: Title
  ) {this.id = activatedRoute.snapshot.params['id'];
    this.AddForm = new FormGroup({
      'title': new FormControl(null,[Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      'rating': new FormControl(null,[Validators.required, Validators.pattern("^[1-5_-]{1}$")]),
      'content': new FormControl(null,[Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    });
    this.title.setTitle('Admin | Review - Add');
  }

  ngOnInit(): void {


  }


  addNew() {
    this.messageService.add({ severity: 'info', summary: 'Loading', detail: 'Loading...' });
    let upload:any = {
      'title': this.AddForm.value.title,
      'rating': this.AddForm.value.rating,
      'content': this.AddForm.value.content,
      'product_id': this.id,
      'user_id': this.tokenStorage.getUser_id()

    }
    setTimeout(() => {
      this.ReviewService.post(this.id,upload).subscribe({
        next: (data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add success' });
          setTimeout(() => {
            console.log(data.data.user_id);
            this.route.navigate(['/review/list']);

          });
        }

      });
    }, 6000);



  }

}
