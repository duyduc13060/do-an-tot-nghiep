import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/_service/Brand-service/brand.service';
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  AddForm: FormGroup;

  regex: string = '^[\\w\'\\-,.][^0-9_!¡?÷?¿/\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$'

  constructor(
    private BrandService: BrandService,
    private messageService: MessageService,
    private route: Router,
    private title: Title,
    private toast: NgToastService
  ) {
    this.AddForm = new FormGroup({
      'brandName': new FormControl(null,[Validators.required,
                                                            Validators.minLength(2),
                                                            Validators.maxLength(250),
                                                            Validators.pattern(this.regex)]),
    });
    this.title.setTitle('Admin | Branch - Add');
  }

  ngOnInit(): void {

  }

  addNew() {
    this.messageService.add({ severity: 'info', summary: 'Loading', detail: 'Loading...' });
    let upload:any = {
      'brandName': this.AddForm.value.brandName,
      'description': this.AddForm.value.description
    }
    this.BrandService.post(upload).subscribe({
      next: (data: any) => {
        this.toast.success({ summary: 'Thêm mới thành công', duration: 3000 });
        this.route.navigate(['/brand']);
      }
    });
  }
}
