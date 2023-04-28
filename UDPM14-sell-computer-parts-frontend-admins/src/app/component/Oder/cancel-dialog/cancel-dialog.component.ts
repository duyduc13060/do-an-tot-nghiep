import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TrimService } from '../../../_service/Trim-Service/trim.service';
import { ConfirmDialogComponent } from '../../../_helper/confirm-dialog/confirm-dialog.component';
import { Constant } from '../../../_constant/Constant';
import { OrderService } from '../../../_service/order-service/order.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-cancel-dialog',
  templateUrl: './cancel-dialog.component.html',
  styleUrls: ['./cancel-dialog.component.css']
})
export class CancelDialogComponent implements OnInit {
  cancelOrder = this.fb.group({
    reason: ['', Validators.required]
  })


  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CancelDialogComponent>,
    private trimService: TrimService,
    private matDialog: MatDialog,
    private orderService: OrderService,
    private toast: NgToastService
  ) { }

  ngOnInit() {
    console.log(this.dataDialog);
  }

  close(){
    this.matDialogRef.close('close');
  }

  checkTrim(){
    this.trimService.inputTrim(this.cancelOrder,['reason']);
  }

  onSubmit(){
    this.checkTrim();
    this.cancelOrder.markAllAsTouched();
    if (this.cancelOrder.invalid) {
      return;
    }
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn hủy đơn hàng?'
      }
    }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.orderService.canceledOrder(this.dataDialog, this.cancelOrder.value.reason).subscribe({
            next: res =>{
              this.toast.success({summary:'Hủy đơn thành công', duration:3000});
              this.matDialogRef.close('submit')
            },
            error: e =>{
              console.log(e);
              this.toast.error({summary:'Hủy đơn thất bại', duration:3000});
              this.matDialogRef.close('submit')
            }
          })
        }
    })

  }

}
