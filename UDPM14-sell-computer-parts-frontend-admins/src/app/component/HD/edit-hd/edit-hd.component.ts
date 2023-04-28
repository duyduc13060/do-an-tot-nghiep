import { HdService } from './../../../_service/hd-service/hd.service';
import { ProductApiService } from 'src/app/_service/product-service/product-api.service';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-hd',
  templateUrl: './edit-hd.component.html',
  styleUrls: ['./edit-hd.component.css']
})
export class EditHdComponent implements OnInit {


  product: any =[];
  id!:number;
  groupForm: FormGroup;
  groupSelect: any
  hd : any;
  constructor(private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private route: Router,
    private title: Title,
    private ProductApiService : ProductApiService,
    private HdService : HdService

  ) {
    this.id = activatedRoute.snapshot.params['id'];
    this.groupForm = new FormGroup({
      'type': new FormControl(null,[Validators.required, Validators.minLength(1), Validators.maxLength(7)]),
      'pcle': new FormControl(null,[Validators.required, Validators.minLength(1), Validators.maxLength(7)]),
      'productId': new FormControl(2,[Validators.required]),
    });
    this.title.setTitle('Admin | hd - Edit');
  }


  ngOnInit(): void {
    this.HdService.getOne(this.id).subscribe((data) => {
      this.hd = data.data;
      this.groupSelect = this.hd.productId;

    });
    // this.ProductApiService.getAllProduct(0,50).subscribe((data) => {
    //   this.product = data.data;
    //   console.log(data.data)
    // });
    this.HdService.getCaseProductHd().subscribe((data) => {
      this.product = data.data;
      console.log(data);
    });

  }
  changeGroup = (val:any) => {{
    this.groupSelect = val.target.value
  }}

  edithd(){
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Loading...'})

        let groupForm: any = {

          'type': this.groupForm.value.type,
          'pcle': this.groupForm.value.pcle,
          'productId': + this.groupSelect,

        };


        setTimeout(() => {
           this.HdService.put(this.id,groupForm).subscribe({
          next: (data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Edit success' })
            setTimeout(() => {
              this.route.navigate(['/hd']);

            },2000)

          },
          error: ({ error }) => {
            this.messageService.add({ severity: 'error', summary: 'Success', detail: `${error}`})

          },
        });
        }, 3000);


  }
}
