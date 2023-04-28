import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { Chip } from '../../../_model/chip';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChipApiService } from '../../../_service/chip-service/chip-api.service';

@Component({
  selector: 'app-add-chip',
  templateUrl: './add-chip.component.html',
  styleUrls: ['./add-chip.component.css']
})
export class AddChipComponent implements OnInit {

  chip: Chip = new Chip();
  products: any[] = [];

  @Output()
  saveFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private modelService: NgbModal,
    private rest: ChipApiService
  ) { }

  ngOnInit(): void {
    this.getCateProductChip();
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

  createChip() {
    this.rest.create(this.chip).subscribe(data => {
      this.saveFinished.emit('New chip is saved !')
      this.modelService.dismissAll();
      console.log(data);
    })
  }

}
