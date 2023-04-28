import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductApiService } from 'src/app/_service/product-service/product-api.service';
import { HdService } from './../../../_service/hd-service/hd.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-hd',
  templateUrl: './add-hd.component.html',
  styleUrls: ['./add-hd.component.css']
})
export class AddHdComponent implements OnInit {



  Product: any;
  AddForm: FormGroup;
  grSelect:any;
  constructor(
    private HdService: HdService,
    private ProductApiService: ProductApiService,
    private messageService: MessageService,
    private route: Router,
    private title: Title
  ) {
    this.AddForm = new FormGroup({
      'type': new FormControl(null,[Validators.required, Validators.minLength(1), Validators.maxLength(7)]),
      'pcle': new FormControl(null,[Validators.required, Validators.minLength(1), Validators.maxLength(7)]),
      'productId': new FormControl(2,[Validators.required]),

    });
    this.title.setTitle('Admin | hd - Add');
  }

  ngOnInit(): void {
    // this.ProductApiService.getAllProduct(0,50).subscribe((data) => {
    //   this.Product = data.data;
    //   console.log(data);
    // });
    this.HdService.getCaseProductHd().subscribe((data) => {
      this.Product = data.data;
      console.log(data);
    });


  }

  selectGroup = (event: any) => {
    this.grSelect = event.target.value;
  };

  addNew() {
    this.messageService.add({ severity: 'info', summary: 'Loading', detail: 'Loading...' });
    let upload:any = {
      'type': this.AddForm.value.type,
      'pcle': this.AddForm.value.pcle,
      'productId': + this.grSelect,

    }
    setTimeout(() => {
      this.HdService.post(upload).subscribe({
        next: (data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add success' });
          setTimeout(() => {
            this.route.navigate(['/hd']);

          });
        }

      });
    }, 6000);

  }

}
