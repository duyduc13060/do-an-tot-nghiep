import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductApiService } from './../../../_service/product-service/product-api.service';
import { RamService } from './../../../_service/ram-service/ram.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-ram',
  templateUrl: './ram.component.html',
  styleUrls: ['./ram.component.css']
})
export class RamComponent implements OnInit {



  case: any;
  Product: any;
  AddForm: FormGroup;
  grSelect:any;
  constructor(
    private RamService: RamService,
    private ProductApiService: ProductApiService,
    private messageService: MessageService,
    private route: Router,
    private title: Title,
    private toast: NgToastService
  ) {
    this.AddForm = new FormGroup({
      'ddr': new FormControl(null,[Validators.required, Validators.pattern("^[0-9_-]{1,3}$")]),
      'bus': new FormControl(null,[Validators.required, Validators.pattern("^[0-9_-]{1,3}$")]),
      'productId': new FormControl(null,[Validators.required]),

    });
    this.title.setTitle('Admin | case - Add');
  }

  ngOnInit(): void {
    // this.ProductApiService.getAllProduct(0,50).subscribe((data) => {
    //   this.Product = data.data;
    //   console.log(data);
    // });
    this.RamService.getCateProductRam().subscribe(res=>{
      this.Product = res.data;
    })
  }

  selectGroup = (event: any) => {
    this.grSelect = event.target.value;
  };

  addNew() {
    this.messageService.add({ severity: 'info', summary: 'Loading', detail: 'Loading...' });
    let upload:any = {
      'ddr': this.AddForm.value.ddr,
      'bus': this.AddForm.value.bus,
      'productId': + this.grSelect,

    }
    this.RamService.post(upload).subscribe({
      next: (data: any) => {
        this.toast.success({ summary: 'Thêm mới thành công', duration: 3000 });
        this.route.navigate(['/ram']);
      }
    });
  }

}
