import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CasesService } from './../../../_service/Cases-service/cases.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductApiService } from 'src/app/_service/product-service/product-api.service';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.css']
})
export class AddCaseComponent implements OnInit {


  case: any;
  Product: any;
  AddForm: FormGroup;
  grSelect:any;
  constructor(
    private CasesService: CasesService,
    private ProductApiService: ProductApiService,
    private messageService: MessageService,
    private route: Router,
    private title: Title
  ) {
    this.AddForm = new FormGroup({
      'size': new FormControl(null,[Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
      'productId': new FormControl(null,[Validators.required]),

    });
    this.title.setTitle('Admin | case - Add');
  }

  ngOnInit(): void {
    // this.ProductApiService.getAllProduct(0,50).subscribe((data) => {
    //   this.Product = data.data;
    //   console.log(data);
    // });
    this.CasesService.getCateProductCase().subscribe((data) => {
      this.Product = data.data;
    });
  }

  selectGroup = (event: any) => {
    this.grSelect = event.target.value;
  };

  addNew() {
    this.messageService.add({ severity: 'info', summary: 'Loading', detail: 'Loading...' });
    let upload:any = {
      'size': this.AddForm.value.size,
      'productId': + this.grSelect,

    }
    setTimeout(() => {
      this.CasesService.post(upload).subscribe({
        next: (data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add success' });
          setTimeout(() => {
            this.route.navigate(['/case']);

          });
        }

      });
    }, 6000);

  }
}
