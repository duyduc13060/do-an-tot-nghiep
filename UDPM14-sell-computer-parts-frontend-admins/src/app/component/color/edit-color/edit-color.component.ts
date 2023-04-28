import { ColorService } from 'src/app/_service/color-service/color.service';
import { ProductApiService } from 'src/app/_service/product-service/product-api.service';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-color',
  templateUrl: './edit-color.component.html',
  styleUrls: ['./edit-color.component.css']
})
export class EditColorComponent implements OnInit {


  product: any =[];
  id!:number;
  groupForm: FormGroup;
  groupSelect: any
  color : any;
  constructor(private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private route: Router,
    private title: Title,
    private ProductApiService : ProductApiService,
    private ColorService : ColorService

  ) {
    this.id = activatedRoute.snapshot.params['id'];
    this.groupForm = new FormGroup({
      'colorName': new FormControl(null,[Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      'productId': new FormControl(null,[Validators.required]),
    });
    this.title.setTitle('Admin | Color - Edit');
  }


  ngOnInit(): void {
    this.ColorService.getOne(this.id).subscribe((data) => {
      this.color = data.data;
      this.groupSelect = this.color.productId;

    });
    this.ProductApiService.getAllProduct(0,50).subscribe((data) => {
      this.product = data.data;
      console.log(data.data)
    });

  }
  changeGroup = (val:any) => {{
    this.groupSelect = val.target.value
  }}

  editcolor(){
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Loading...'})

        let groupForm: any = {
          'colorName': this.groupForm.value.colorName,
          'productId': + this.groupSelect,


        };
        console.log(groupForm);

        setTimeout(() => {
           this.ColorService.put( this.id,groupForm).subscribe({
          next: (data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Edit success' })
            setTimeout(() => {
              this.route.navigate(['/color']);

            },2000)

          },
          error: ({ error }) => {
            this.messageService.add({ severity: 'error', summary: 'Success', detail: `${error}`})

          },
        });
        }, 3000);


  }
}
