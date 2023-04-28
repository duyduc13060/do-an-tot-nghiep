import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';
import { UserService } from 'src/app/_service/user-service/user.service';
import { ProductApiService } from 'src/app/_service/product-service/product-api.service';
import { ReviewService } from './../../../_service/review-service/review.service';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {

  product: any =[];
  user: any =[];

  groupSelect: any
  groupSelect_user : any;

  id!:number;
  groupForm: FormGroup;

  review : any;
  constructor(private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private route: Router,
    private title: Title,
    private ReviewService : ReviewService,
    private ProductApiService : ProductApiService,
    private tokenStorage: TokenStorageService,
    private UserService : UserService

  ) {
    this.id = activatedRoute.snapshot.params['id'];
    this.groupForm = new FormGroup({
      title: new FormControl(null,[Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      rating: new FormControl(null,[Validators.required, Validators.pattern("^[1-5_-]{1}$")]),
      content: new FormControl(null,[Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      product_id: new FormControl(),

    });
    this.title.setTitle('Admin | Category - Edit');
  }

  changeGroup = (val:any) => {{
    this.groupSelect = val.target.value
  }}
  changeGroup_user = (val:any) => {{
    this.groupSelect_user = val.target.value
  }}
  ngOnInit(): void {
    this.ReviewService.getOne(this.id).subscribe((data) => {
      this.review = data.data;
      this.groupSelect = this.review.product_id;
      this.groupSelect_user = this.review.user_id;


    });

    this.ProductApiService.getAllProduct(0,50).subscribe(data => {
      this.product = data.data;
      console.log(data);
    })
    this.UserService.getAllUser().subscribe(data => {
      this.user = data.data;
      console.log(data);
    })


  }


  editcolor(){
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Loading...'})

        let groupForm: any = {
          title: this.groupForm.value.title,
      rating: this.groupForm.value.rating,
      content: this.groupForm.value.content,
      product_id: + this.groupSelect,
      user_id: this.tokenStorage.getUser_id()

        };
        console.log(groupForm);

        setTimeout(() => {
           this.ReviewService.put( this.id,groupForm).subscribe({
          next: (data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Edit success' })
            setTimeout(() => {
              this.route.navigate(['/review/list']);

            },2000)

          },
          error: ({ error }) => {
            this.messageService.add({ severity: 'error', summary: 'Success', detail: `${error}`})

          },
        });
        }, 3000);


  }

}
