import { brands } from './../../../common/Brands';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/_service/Brand-service/brand.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {



  id!:number;
  groupForm: FormGroup;
  regex: string = '^[\\w\'\\-,.][^0-9_!¡?÷?¿/\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$'
  brands : any;
  constructor(private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private route: Router,
    private title: Title,
    private BrandService : BrandService,


  ) {
    this.id = activatedRoute.snapshot.params['id'];
    this.groupForm = new FormGroup({
      'brandName': new FormControl(null,[Validators.required,
                                                            Validators.minLength(2),
                                                            Validators.maxLength(50),
                                                            Validators.pattern(this.regex)]),
    });
    this.title.setTitle('Admin | Category - Edit');
  }


  ngOnInit(): void {
    this.BrandService.getOne(this.id).subscribe((data) => {
      this.brands = data.data;
    });


  }


  editcolor(){
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Loading...'})

        let groupForm: any = {
          'brandName': this.groupForm.value.brandName,
          'description': this.groupForm.value.description

        };


        setTimeout(() => {
           this.BrandService.put( this.id,groupForm).subscribe({
          next: (data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Edit success' })
            setTimeout(() => {
              this.route.navigate(['/brand']);

            },2000)

          },
          error: ({ error }) => {
            this.messageService.add({ severity: 'error', summary: 'Success', detail: `${error}`})

          },
        });
        }, 3000);


  }
}
