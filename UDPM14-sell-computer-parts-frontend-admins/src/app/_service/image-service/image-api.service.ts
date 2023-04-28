import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = "http://localhost:8080/api/v1/images";

const URL_PRODUCT = "http://localhost:8080/api/v1/product";

@Injectable({
  providedIn: 'root'
})
export class ImageApiService {

  constructor(private rest: HttpClient) { }


  getAll(params: any): Observable<any> {
    return this.rest.get(URL + '/list', { params });
  }

  getAllProduct(page: number, pageNumber: number): Observable<any> {
    return this.rest.get(URL_PRODUCT + '/list' + "?page=" + page + "&page-size=" + pageNumber);
  }


  create(image: any, file?: any): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('name',image.name);
    formData.append('product_id', image.product_id);

    return this.rest.post(URL + "/create", formData);
  }

  update(id: number,image: any, file?: any): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('name',image.name);
    formData.append('product_id', image.product_id.toString());

    return this.rest.put(URL + "/upload-image/" + id, formData);
  }


  getById(id: number): Observable<any> {
    return this.rest.get(URL + '/' + id);
  }

  delete(id: number): Observable<any> {
    return this.rest.delete(URL + "/delete/" + id);
  }

  getAllImages(): Observable<any> {
    return this.rest.get(URL + "/list");
  }

  getImagesByProductId(id: number): Observable<any> {
    return this.rest.get(URL + "/product-id/" + id);
  }

  // tìm kiếm sản phẩm theo mã sp
  findByMaCodeProduct(id:any): Observable<any>{
    return this.rest.get(URL + "/product-maSP/" + id);
  }


}
