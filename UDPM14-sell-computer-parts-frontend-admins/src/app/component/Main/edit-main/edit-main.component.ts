import { error } from 'jquery';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HdService } from './../../../_service/hd-service/hd.service';
import { VgaService } from './../../../_service/vga-service/vga.service';
import { MainService } from './../../../_service/main-service/main.service';
import { RamService } from './../../../_service/ram-service/ram.service';
import { ChipApiService } from './../../../_service/chip-service/chip-api.service';
import { ProductApiService } from './../../../_service/product-service/product-api.service';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-main',
  templateUrl: './edit-main.component.html',
  styleUrls: ['./edit-main.component.css']
})
export class EditMainComponent implements OnInit {
  product: any =[];
  vga: any =[];
  ram: any =[];
  chip: any =[];
  hd: any =[];
  id!:number;
  groupForm: FormGroup;
  groupSelect_pro: any;
  groupSelect_chip: any;
  groupSelect_ram: any;
  groupSelect_vga: any;
  groupSelect_hd: any;
  main : any;
  constructor(private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private route: Router,
    private title: Title,
    private ProductApiService: ProductApiService,
    private ChipApiService: ChipApiService,
    private RamService: RamService,
    private MainService: MainService,
      private VgaService: VgaService,
      private HdService: HdService,

  ) {
    this.id = activatedRoute.snapshot.params['id'];
    this.groupForm = new FormGroup({
      'socket': new FormControl(null,[Validators.required, Validators.minLength(1), Validators.maxLength(7)]),
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
    this.title.setTitle('Admin | psu - Edit');
  }


  ngOnInit(): void {
    this.MainService.getOne(this.id).subscribe((data) => {
      this.main = data.data;
      this.groupSelect_pro = this.main.productId;
      this.groupSelect_hd = this.main.hdId;
      this.groupSelect_chip = this.main.chipId;
      this.groupSelect_vga= this.main.vgaId;
      this.groupSelect_ram = this.main.ramId;

    });
    this.ProductApiService.getAllProduct(0,50).subscribe((data) => {
      this.product = data.data;
      console.log(data.data)
    });
    this.ChipApiService.getAllProduct(0,50).subscribe((data) => {
      this.chip = data.data;
      console.log(data.data)
    });
    this.RamService.getAll().subscribe((data) => {
      this.ram = data.data;
      console.log(data.data)
    });
    this.VgaService.getAll().subscribe((data) => {
      this.vga = data.data;
      console.log(data.data)
    });
    this.HdService.getAll().subscribe((data) => {
      this.hd = data.data;
      console.log(data.data)
    });

  }
  changeGroup_pro = (val:any) => {{
    this.groupSelect_pro = val.target.value
  }}
  changeGroup_vga = (val:any) => {{
    this.groupSelect_vga = val.target.value
  }}
  changeGroup_hd = (val:any) => {{
    this.groupSelect_hd = val.target.value
  }}
  changeGroup_ram = (val:any) => {{
    this.groupSelect_ram = val.target.value
  }}
  changeGroup_chip = (val:any) => {{
    this.groupSelect_chip = val.target.value
  }}

  editpsu(){
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Loading...'})

        let groupForm: any = {


          'socket': this.groupForm.value.socket,
          'slotRam': this.groupForm.value.slotRam,
          'ddr': this.groupForm.value.ddr,
          'busRam': this.groupForm.value.busRam,
          'slotM2': this.groupForm.value.slotM2,
          'slotData': this.groupForm.value.slotData,
          'size': this.groupForm.value.size,
          'hdId': +this.groupSelect_hd,
          'vgaId': +this.groupSelect_vga,
          'productId': +this.groupSelect_pro,
          'chipId': +this.groupSelect_chip,
          'ramId': +this.groupSelect_ram,

        };


        setTimeout(() => {
           this.MainService.put(this.id,groupForm).subscribe({
          next: (data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Edit success' })
            setTimeout(() => {
              this.route.navigate(['/psu']);

            },2000)

          },
          error: ({ error }) => {
            this.messageService.add({ severity: 'error', summary: 'Success', detail: `${error}`})

          },
        });
        }, 3000);


  }
}
