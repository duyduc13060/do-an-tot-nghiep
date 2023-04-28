import { Component, Input, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { VGA } from 'src/app/_model/Vga';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VgaService } from '../../../_service/vga-service/vga.service';
import { NgToastService } from 'ng-angular-popup';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-vga',
  templateUrl: './edit-vga.component.html',
  styleUrls: ['./edit-vga.component.css']
})
export class EditVgaComponent implements OnInit {
  doing = false;
  vga: VGA = new VGA();
  products: any[] = [];
  validateForm!: FormGroup;
  @Input("id")
  editId!: number;

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private modelService: NgbModal,
    private rest: VgaService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.getAllProduct();
    this.rest.getVgaById(this.editId).subscribe(data => {
      this.vga = data.data;
    })
    this.validateForm = new FormGroup({
      'type': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      'size': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    })
  }

  open(content: TemplateRef<any>) {
    this.modelService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getAllProduct() {
    this.rest.getAllProduct(0, 50).subscribe(data => {
      this.products = data.data;
    })
  }

  updateVga() {
    this.doing = true;
    this.rest.update(this.editId, this.vga).subscribe(data => {
      this.doing = false;
      this.toast.success({ summary: 'Login success', duration: 3000 });
      this.updateFinished.emit('New vga is saved !')
      this.modelService.dismissAll();
      console.log(data);
    })
  }
}
