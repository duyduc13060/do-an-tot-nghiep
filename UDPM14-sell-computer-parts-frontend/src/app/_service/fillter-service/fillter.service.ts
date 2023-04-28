import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FillterService {

  url = "http://localhost:8080/api/v1/filter";
  url2= "http://localhost:8080/api/v1/product";

  constructor(private http: HttpClient) { }

  fillterByPrice(s_price: number, e_price: number, page: number, pageSize: number): Observable<any> {
    return this.http.get(this.url + '?s_price=' + s_price + '&e_price=' + e_price + "&page=" + page + "&page-size=" + pageSize);
  }

  fillterByProductCate(id: number,s_price: number, e_price: number,params: any): Observable<any> {
    return this.http.get(this.url+"/" + id + '?s_price=' + s_price + '&e_price=' + e_price, {params});
  }

  fillterByColor(id: number, page: number, pageSize: number): Observable<any> {
    return this.http.get(this.url + "/color/" + id + "?page=" + page + "&page-size=" + pageSize);
  }

  fillterByBrand(id: number, page: number, pageSize: number): Observable<any> {
    return this.http.get(this.url + "/brand/" + id + "?page=" + page + "&page-size=" + pageSize);
  }
}
