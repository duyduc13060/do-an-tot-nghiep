
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/_service/upload/upload.service';
import { GroupComponentService } from 'src/app/_service/group-component/group-component.service';
import { BrandService } from 'src/app/_service/Brand-service/brand.service';

@Component({
  selector: 'app-add-group-component',
  templateUrl: './add-group-component.component.html',
  styleUrls: ['./add-group-component.component.css']
})
export class AddGroupComponentComponent implements OnInit {

  brands: any;
  AddForm: FormGroup;
  file: any = [];
  status: any[] = [
    { name: 'active', value: 'active' },
    { name: 'hidden', value: 'hidden' },
  ];
  regex: string = '^[\\w\'\\-,.a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\ ][^_!¡?÷?¿/\\\\+=@#$%ˆ&*{}~<>;:[\\]]{2,}$'

  grSelect:any;
  constructor(
    private GroupComponentService: GroupComponentService,
    private BrandService: BrandService,
    private messageService: MessageService,
    private route: Router,
    private uploadFile: UploadService,
    private title: Title
  ) {
    this.AddForm = new FormGroup({
      'name': new FormControl(null,[Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(this.regex)]),
      // 'brandId': new FormControl(null,[Validators.required]),
    });
    this.title.setTitle('Admin | GroupComponent - Add');
  }

  ngOnInit(): void {
    this.BrandService.getAll().subscribe((data) => {
      this.brands = data.data;
      console.log(data);
    });
  }
  // selectOption = (event: any) => {
  //   this.selected = event.target.value;
  // };
  selectGroup = (event: any) => {
    this.grSelect = event.target.value;
  };
  saveFileThumail(event: any) {
    this.file = event.target.files[0];
    this.uploadFile.uploadImg(this.file);
  }

  addNew() {
    this.messageService.add({ severity: 'info', summary: 'Loading', detail: 'Loading...' });
    let upload:any = {
      'name': this.AddForm.value.name,
      'brandId': + this.grSelect,

    }
    setTimeout(() => {
      this.GroupComponentService.post(upload).subscribe({
        next: (data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add success' });
          setTimeout(() => {
            this.route.navigate(['/groupcomponent']);

          });
        }

      });
    }, 3000);



  }

}
