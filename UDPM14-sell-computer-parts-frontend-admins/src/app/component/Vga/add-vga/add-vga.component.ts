import { Component, OnInit, TemplateRef } from '@angular/core';
import { VGA } from 'src/app/_model/Vga';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { STATUS } from 'src/app/_model/status';
import { VgaService } from 'src/app/_service/vga-service/vga.service';
import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-vga',
  templateUrl: './add-vga.component.html',
  styleUrls: ['./add-vga.component.css']
})
export class AddVgaComponent implements OnInit {
  vga: VGA = new VGA;
  products: any[] = [];
  isLoading: boolean = false;

  categories: any[] = [];
  voucher: any[] = [];
  brand: any[] = [];
  validateForm!: FormGroup;
  constructor(
    private restV: VgaService,
    private toast: NgToastService,
    private modelService: NgbModal,
  ) { }

  ngOnInit(): void {

    this.validateForm = new FormGroup({
      'type': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      'size': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    })
  }

  createVga() {
    this.isLoading = true;
    this.restV.create(this.vga).subscribe(data => {
      this.isLoading = false;
      this.toast.success({ summary: 'Create product successfuly', duration: 3000 });
      console.log(data.data);
    })
  }

  getAllProduct(){
    this.restV.getAllProduct(0,50).subscribe(data=>{
      this.products = data.data;
    })
  }

  open(content: TemplateRef<any>) {
    this.modelService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
