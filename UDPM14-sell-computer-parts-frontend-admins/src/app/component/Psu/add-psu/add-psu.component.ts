import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductApiService } from './../../../_service/product-service/product-api.service';
import { PsuService } from './../../../_service/psu-service/psu.service';
import { FormGroup, Validators ,FormControl} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-psu',
  templateUrl: './add-psu.component.html',
  styleUrls: ['./add-psu.component.css']
})
export class AddPsuComponent implements OnInit {

  case: any;
  Product: any;
  AddForm: FormGroup;
  grSelect:any;
  constructor(
    private PsuService: PsuService,
    private ProductApiService: ProductApiService,
    private messageService: MessageService,
    private route: Router,
    private title: Title
  ) {
    this.AddForm = new FormGroup({
      'size': new FormControl(null,[Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
      'wattage': new FormControl(null,[Validators.required, Validators.pattern("^[0-9_-]{1,3}$")]),
      'productId': new FormControl(null,[Validators.required]),

    });
    this.title.setTitle('Admin | Psu- Add');
  }

  ngOnInit(): void {
    // this.ProductApiService.getAllProduct(0,50).subscribe((data) => {
    //   this.Product = data.data;
    //   console.log(data);
    // });
    this.PsuService.getCateProductPsu().subscribe((data) => {
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
      'size': this.AddForm.value.size,
      'wattage': this.AddForm.value.wattage,
      'productId': + this.grSelect,

    }
    setTimeout(() => {
      this.PsuService.post(upload).subscribe({
        next: (data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add success' });
          setTimeout(() => {
            this.route.navigate(['/psu']);

          });
        }

      });
    }, 6000);

  }
}
