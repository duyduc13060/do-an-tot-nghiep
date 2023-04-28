import { PsuService } from './../../../_service/psu-service/psu.service';
import { ProductApiService } from './../../../_service/product-service/product-api.service';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-psu',
  templateUrl: './edit-psu.component.html',
  styleUrls: ['./edit-psu.component.css']
})
export class EditPsuComponent implements OnInit {

  product: any =[];
  id!:number;
  groupForm: FormGroup;
  groupSelect: any
  psu : any;
  constructor(private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private route: Router,
    private title: Title,
    private ProductApiService : ProductApiService,
    private PsuService : PsuService

  ) {
    this.id = activatedRoute.snapshot.params['id'];
    this.groupForm = new FormGroup({
      'size': new FormControl(null,[Validators.required, Validators.minLength(1), Validators.maxLength(7)]),
      'wattage': new FormControl(null,[Validators.required, Validators.pattern("^[0-9_-]{1,3}$")]),
      'productId': new FormControl(2,[Validators.required]),
    });
    this.title.setTitle('Admin | psu - Edit');
  }


  ngOnInit(): void {
    this.PsuService.getOne(this.id).subscribe((data) => {
      this.psu = data.data;
      this.groupSelect = this.psu.productId;

    });
    // this.ProductApiService.getAllProduct(0,50).subscribe((data) => {
    //   this.product = data.data;
    //   console.log(data.data)
    // });
    this.PsuService.getCateProductPsu().subscribe((data) => {
      this.product = data.data;
      console.log(data);
    });

  }
  changeGroup = (val:any) => {{
    this.groupSelect = val.target.value
  }}

  editpsu(){
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Loading...'})

        let groupForm: any = {

          'size': this.groupForm.value.size,
          'wattage': this.groupForm.value.wattage,
          'productId': + this.groupSelect,

        };


        setTimeout(() => {
           this.PsuService.put(this.id,groupForm).subscribe({
          next: (data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Edit success' })
            setTimeout(() => {
              this.route.navigate(['/psu']);

            },2000)

          },
          error: ({ error }) => {
            this.messageService.add({ severity: 'error', summary: 'Success', detail: `${error}`})

          },
        });
        }, 3000);


  }

}
