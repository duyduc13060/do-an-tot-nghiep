import { data } from 'jquery';
import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentApiService } from './../../../_service/payment-service/payment-api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css']
})
export class ListPaymentComponent implements OnInit {

  isLoading: boolean = true;
  payments: any[] = [];
  confirmMessage = '';
  deleteId!: number;

  constructor(
    private rest: PaymentApiService,
    private modalService: NgbModal,
    private toast: NgToastService,
  ) { }

  ngOnInit() {
    this.getAllPaymentAndPage();
  }


  confirmDeletePayment(confirmDialog: TemplateRef<any>, id: number, name: string) {
    this.confirmMessage = `Do you want to delete ${name} ?`;
    this.deleteId = id;
    this.modalService.open(confirmDialog,
      { ariaDescribedBy: 'modal-basic-title' }).result.then((result) => {
      }).catch((err) => {

      })
  }

  deletePayment() {
    if (this.deleteId != null) {
      this.rest.deletePayment(this.deleteId).subscribe(data => {
        this.modalService.dismissAll();
        this.ngOnInit();
        this.toast.success({ summary: 'Delete successfuly', duration: 3000 });
      })

    }
  }



  getAllPaymentAndPage() {
    this.isLoading = true;
    this.rest.getAllPayment().subscribe(response => {
      this.payments = response.data;
      this.isLoading = false;
    },
      error => {
        console.log(error);
      });
  }




}
