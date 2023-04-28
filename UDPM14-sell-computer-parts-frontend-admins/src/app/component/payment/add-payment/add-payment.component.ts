import { PaymentApiService } from './../../../_service/payment-service/payment-api.service';
import { NgToastService } from 'ng-angular-popup';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  isLoading: boolean = true;

  selectedFiles?: FileList;
  currentFile?: File;
  img_url = '';

  paymentform = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required]),
    'file': new FormControl('', [Validators.required]),
  })

  constructor(
    private rest: PaymentApiService,
    private toast: NgToastService
  ) { }

  ngOnInit() {
    this.isLoading = false;
  }

  get f() {
    return this.paymentform.controls;
  }

  onFileChange(event: any) {
    this.img_url = '';
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.img_url = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.img_url = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }

  }

  createPayment() {
    this.isLoading = true;
    this.rest.createPayment(this.paymentform.value, this.currentFile)
      .subscribe(data => {
        this.isLoading = false;
        this.toast.success({ summary: 'Create successfuly', duration: 3000 });
        console.log(data.data);
      },
      error => {
        this.toast.error({ summary: 'Create error', sticky: true });
        this.isLoading = false;
        console.log(error);
      });
  }


}
