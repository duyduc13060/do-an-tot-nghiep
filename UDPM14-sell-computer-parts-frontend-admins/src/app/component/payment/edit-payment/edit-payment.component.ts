import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PaymentApiService } from './../../../_service/payment-service/payment-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/_model/payment';

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.css']
})
export class EditPaymentComponent implements OnInit {

  isLoading: boolean = true;
  id!: number;
  payment: Payment = new Payment();

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
    private toast: NgToastService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isLoading = true;
    this.rest.getOne(this.id).subscribe(data => {
      this.isLoading = false;
      this.payment = data.data;
      this.img_url = data.data.image;
    })
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

  editPayment() {
    this.isLoading = true;
    this.rest.editPayment(this.id,this.paymentform.value, this.currentFile)
      .subscribe(data => {
        this.isLoading = false;
        this.toast.success({ summary: 'Edit successfuly', duration: 3000 });
        console.log(data.data);

      },
      error => {
        this.toast.error({ summary: 'Edit error', sticky: true });
        this.isLoading = false;
        console.log(error);
      });
  }

}
