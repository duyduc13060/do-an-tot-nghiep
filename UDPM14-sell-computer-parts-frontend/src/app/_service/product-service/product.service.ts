import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "http://localhost:8080/api/v1/product";

  constructor(private http: HttpClient) { }

  getAllProduct(params: any): Observable<any> {
    return this.http.get(this.url + "/search", { params });
  }

  getAllProductList(page: number, pageNumber: number): Observable<any> {
    return this.http.get(this.url + "/list" + '?page=' + page + '&page-size=' + pageNumber);
  }

  findAllProductList(name: string, page: number, pageNumber: number): Observable<any> {
    return this.http.get(this.url + "/search" + '?name=' + name + '&page=' + page + '&page-size=' + pageNumber);
  }

  getProductByCategory(id: number, page: number, pageNumber: number): Observable<any> {
    return this.http.get(this.url + "/category/" + id + '?page=' + page + '&page-size=' + pageNumber);
  }

  getProductByCategorys(id: number, params: any): Observable<any> {
    return this.http.get(this.url + "/category/" + id, { params });
  }

  getProductById(id: number, page: number, pageNumber: number): Observable<any> {
    return this.http.get(this.url + "/" + id + '?page=' + page + '&page-size=' + pageNumber);
  }

  getOneProduct(id: number): Observable<any> {
    return this.http.get(this.url + "/get-one/" + id);
  }
}
