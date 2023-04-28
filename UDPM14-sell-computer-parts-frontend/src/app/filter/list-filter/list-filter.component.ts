import { ActivatedRoute } from '@angular/router';
import { FillterService } from 'src/app/_service/fillter-service/fillter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.css']
})
export class ListFilterComponent implements OnInit {

  page: number = 0;
  count: number = 0;
  pageSize: number = 9;

  constructor(
    private rest: FillterService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.findAllProductCase();
  }

  getRequestParams(page: number, pageSize: number): any {
    const params: any = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`page-size`] = pageSize;
    }

    return params;
  }

  findAllProductCase(){
    const id = +this.activatedRoute.snapshot.params['id'];
    const params = this.getRequestParams(this.page, this.pageSize);

  }

}
