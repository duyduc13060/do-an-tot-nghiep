import { MainService } from './../../../_service/main-service/main.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VgaService } from './../../../_service/vga-service/vga.service';
import { RamService } from './../../../_service/ram-service/ram.service';
import { ChipApiService } from './../../../_service/chip-service/chip-api.service';
import { ProductApiService } from 'src/app/_service/product-service/product-api.service';
import { HdService } from './../../../_service/hd-service/hd.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-main',
  templateUrl: './add-main.component.html',
  styleUrls: ['./add-main.component.css']
})
export class AddMainComponent implements OnInit {




  Product: any;
  hd: any;
  chip: any;
  ram: any;
  vga: any;
  AddForm: FormGroup;
  grSelect_pro:any;
  grSelect_chip:any;
  grSelect_ram:any;
  grSelect_hd:any;
  grSelect_vga:any;
  constructor(
    private ProductApiService: ProductApiService,
    private ChipApiService: ChipApiService,
    private RamService: RamService,
    private MainService: MainService,
      private VgaService: VgaService,
      private HdService: HdService,
    private messageService: MessageService,
    private route: Router,
    private title: Title
  ) {
    this.AddForm = new FormGroup({
      'socket': new FormControl(null,[Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      'slotRam': new FormControl(null,[Validators.required, Validators.pattern("^[0-9_-]{1,5}$")]),
      'ddr': new FormControl(null,[Validators.required, Validators.pattern("^[0-9_-]{1,5}$")]),
      'busRam': new FormControl(null,[Validators.required, Validators.pattern("^[0-9_-]{1,5}$")]),
      'slotM2': new FormControl(null,[Validators.required, Validators.pattern("^[0-9_-]{1,5}$")]),
      'slotData': new FormControl(null,[Validators.required, Validators.pattern("^[0-9_-]{1,5}$")]),
      'size': new FormControl(null,[Validators.required, Validators.pattern("^[0-9_-]{1,5}$")]),
      'hdId': new FormControl(null,[Validators.required]),
      'chipId': new FormControl(null,[Validators.required]),
      'productId': new FormControl(null,[Validators.required]),
      'vgaId': new FormControl(null,[Validators.required]),
      'ramId': new FormControl(null,[Validators.required]),


    });
    this.title.setTitle('Admin | main - Add');
  }

  ngOnInit(): void {
    this.ProductApiService.getAllProduct(0,50).subscribe((data) => {
      this.Product = data.data;
      console.log(data);
    });
    this.HdService.getAll().subscribe((data) => {
      this.hd = data.data;
      console.log(data);
    });
    this.ChipApiService.getAll().subscribe((data) => {
      this.chip = data.data;
      console.log(data);
    });
    this.VgaService.getAll().subscribe((data) => {
      this.vga = data.data;
      console.log(data);
    });
    this.RamService.getAll().subscribe((data) => {
      this.ram = data.data;
      console.log(data);
    });
  }

  selectGroup_pro = (event: any) => {
    this.grSelect_pro = event.target.value;
  };
  selectGroup_chip = (event: any) => {
    this.grSelect_chip = event.target.value;
  };
  selectGroup_hd = (event: any) => {
    this.grSelect_hd= event.target.value;
  };
  selectGroup_ram = (event: any) => {
    this.grSelect_ram= event.target.value;
  };
  selectGroup_vga = (event: any) => {
    this.grSelect_vga = event.target.value;
  };

  addNew() {
    this.messageService.add({ severity: 'info', summary: 'Loading', detail: 'Loading...' });
    let upload:any = {


      'socket': this.AddForm.value.socket,
      'slotRam': this.AddForm.value.slotRam,
      'ddr': this.AddForm.value.ddr,
      'busRam': this.AddForm.value.busRam,
      'slotM2': this.AddForm.value.slotM2,
      'slotData': this.AddForm.value.slotData,
      'size': this.AddForm.value.size,
      'hdId': +this.grSelect_hd,
      'vgaId': +this.grSelect_vga,
      'productId': +this.grSelect_pro,
      'chipId': +this.grSelect_chip,
      'ramId': +this.grSelect_ram,

    }
    setTimeout(() => {
      this.MainService.post(upload).subscribe({
        next: (data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add success' });
          setTimeout(() => {
            this.route.navigate(['/main']);

          });
        }

      });
    }, 3000);

  }

}
