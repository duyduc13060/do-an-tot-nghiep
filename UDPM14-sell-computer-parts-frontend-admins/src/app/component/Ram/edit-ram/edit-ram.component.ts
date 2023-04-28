import { ProductApiService } from './../../../_service/product-service/product-api.service';
import { RamService } from './../../../_service/ram-service/ram.service';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-ram',
  templateUrl: './edit-ram.component.html',
  styleUrls: ['./edit-ram.component.css']
})
export class EditRamComponent implements OnInit {



  product: any =[];
  id!:number;
  groupForm: FormGroup;
  groupSelect: any
  ram : any;
  constructor(private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private route: Router,
    private title: Title,
    private ProductApiService : ProductApiService,
    private RamService : RamService

  ) {
    this.id = activatedRoute.snapshot.params['id'];
    this.groupForm = new FormGroup({
      'ddr': new FormControl(null,[Validators.required, Validators.pattern("^[0-9_-]{1,3}$")]),
      'bus': new FormControl(null,[Validators.required, Validators.pattern("^[0-9_-]{1,3}$")]),
      'productId': new FormControl(null,[Validators.required]),
    });
    this.title.setTitle('Admin | Color - Edit');
  }


  ngOnInit(): void {
    this.RamService.getOne(this.id).subscribe((data) => {
      this.ram = data.data;
      this.groupSelect = this.ram.productId;

    });
    this.RamService.getCateProductRam().subscribe(res=>{
      this.product = res.data;
    })

  }
  changeGroup = (val:any) => {{
    this.groupSelect = val.target.value
  }}

  editcolor(){
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Loading...'})

        let groupForm: any = {
          'ddr': this.groupForm.value.ddr,
          'bus': this.groupForm.value.bus,
          'productId': + this.groupSelect,

        };
        console.log(groupForm);

        setTimeout(() => {
           this.RamService.put( this.id,groupForm).subscribe({
          next: (data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Edit success' })
            setTimeout(() => {
              this.route.navigate(['/ram']);

            },2000)

          },
          error: ({ error }) => {
            this.messageService.add({ severity: 'error', summary: 'Success', detail: `${error}`})

          },
        });
        }, 3000);


  }
}
