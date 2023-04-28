import { Component, OnInit, EventEmitter, TemplateRef, Input, Output } from '@angular/core';
import { Chip } from '../../../_model/chip';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChipApiService } from '../../../_service/chip-service/chip-api.service';
import { outputAst } from '@angular/compiler';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-chip',
  templateUrl: './edit-chip.component.html',
  styleUrls: ['./edit-chip.component.css']
})
export class EditChipComponent implements OnInit {

  doing = false;
  chip: Chip = new Chip();
  products: any[] = [];

  @Input("id")
  editId!: number;

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private modelService: NgbModal,
    private rest: ChipApiService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.getCateProductChip();
    this.rest.getByID(this.editId).subscribe(data=>{
      this.chip = data.data;
    })

  }

  getCateProductChip(){
    this.rest.getCateProductChip().subscribe((res:any)=>{
      this.products = res.data
    })
  }

  open(content: TemplateRef<any>) {
    this.modelService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getAllProduct(){
    this.rest.getAllProduct(0,50).subscribe(data=>{
      this.products = data.data;
    })
  }

  updateChip() {
    this.doing = true;
    this.rest.update(this.editId,this.chip).subscribe(data => {
      this.doing = false;
      this.toast.success({ summary: 'Login success', duration: 3000 });
      this.updateFinished.emit('New chip is saved !')
      this.modelService.dismissAll();
      console.log(data);
    })
  }

}
