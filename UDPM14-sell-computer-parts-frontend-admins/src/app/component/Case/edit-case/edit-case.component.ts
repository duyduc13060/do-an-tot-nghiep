import { CasesService } from './../../../_service/Cases-service/cases.service';
import { ProductApiService } from 'src/app/_service/product-service/product-api.service';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.component.html',
  styleUrls: ['./edit-case.component.css']
})
export class EditCaseComponent implements OnInit {


  product: any =[];
  id!:number;
  groupForm: FormGroup;
  groupSelect: any
  case : any;
  constructor(private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private route: Router,
    private title: Title,
    private ProductApiService : ProductApiService,
    private CasesService : CasesService

  ) {
    this.id = activatedRoute.snapshot.params['id'];
    this.groupForm = new FormGroup({
      'size': new FormControl(null,[Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
      'productId': new FormControl(2,[Validators.required]),
    });
    this.title.setTitle('Admin | Case - Edit');
  }


  ngOnInit(): void {
    this.CasesService.getOne(this.id).subscribe((data) => {
      this.case = data.data;
      this.groupSelect = this.case.productId;

    });
    // this.ProductApiService.getAllProduct(0,50).subscribe((data) => {
    //   this.product = data.data;
    //   console.log(data.data)
    // });
    this.CasesService.getCateProductCase().subscribe((data) => {
      this.product = data.data;
    });

  }
  changeGroup = (val:any) => {{
    this.groupSelect = val.target.value
  }}

  editcase(){
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Loading...'})

        let groupForm: any = {
          'size': this.groupForm.value.size,
          'productId': + this.groupSelect,

        };
        console.log(groupForm);

        setTimeout(() => {
           this.CasesService.put(this.id,groupForm).subscribe({
          next: (data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Edit success' })
            setTimeout(() => {
              this.route.navigate(['/case']);

            },2000)

          },
          error: ({ error }) => {
            this.messageService.add({ severity: 'error', summary: 'Success', detail: `${error}`})

          },
        });
        }, 3000);


  }

}
