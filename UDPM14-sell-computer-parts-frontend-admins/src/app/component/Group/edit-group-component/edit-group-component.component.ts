import { Title } from '@angular/platform-browser';
import { UploadService } from './../../../_service/upload/upload.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GroupComponentService } from 'src/app/_service/group-component/group-component.service';
import { BrandService } from 'src/app/_service/Brand-service/brand.service';


@Component({
  selector: 'app-edit-group-component',
  templateUrl: './edit-group-component.component.html',
  styleUrls: ['./edit-group-component.component.css']
})
export class EditGroupComponentComponent implements OnInit {

  brands: any =[];
  id!:number;
  groupForm: FormGroup;
  groupSelect: any
  groupOne : any;

  regex: string = '^[\\w\'\\-,.a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\ ][^_!¡?÷?¿/\\\\+=@#$%ˆ&*{}~<>;:[\\]]{2,}$'

  constructor(private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private route: Router,
    private title: Title,
    private Group : GroupComponentService,
    private BrandService: BrandService
  ) {
    this.id = activatedRoute.snapshot.params['id'];
    this.groupForm = new FormGroup({
      'name': new FormControl(null,[Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(this.regex)]),
      // 'brandId': new FormControl(null,[Validators.required]),
    });
    this.title.setTitle('Admin | Category - Edit');
  }


  ngOnInit(): void {
    this.Group.getOne(this.id).subscribe((data) => {
      this.groupOne = data.data;
      this.groupSelect = this.groupOne.brandId;


    });
    this.BrandService.getAll().subscribe(data => {
      this.brands = data.data;
      console.log(data);
    })
  }
  changeGroup = (val:any) => {{
    this.groupSelect = val.target.value
  }}

  editgroup(){
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Loading...'})

        let groupForm: any = {
          'name': this.groupForm.value.name,
          'brandId': + this.groupForm,

        };
        console.log(groupForm);

        setTimeout(() => {
           this.Group.put( this.id,groupForm).subscribe({
          next: (data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cập nhập thành công'})
            setTimeout(() => {
              this.route.navigate(['/groupcomponent']);

            },2000)

          },
          error: ({ error }) => {
            this.messageService.add({ severity: 'error', summary: 'Success', detail: `${error}`})

          },
        });
        }, 3000);


  }
}
