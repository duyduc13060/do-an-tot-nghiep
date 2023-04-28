import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chip } from '../../_model/chip';

const URL = 'http://localhost:8080/api/v1/chip';
const URL_PRODUCT = 'http://localhost:8080/api/v1/product';
@Injectable({
  providedIn: 'root'
})
export class ChipApiService {

  constructor(private http: HttpClient) {

  }

  getAllProduct(
    page : number,
    pageNumber: number
    ): Observable<any>{
    return this.http.get(URL_PRODUCT + '?page=' + page + '&page-size=' + pageNumber);
  }

  getByID(id :number): Observable<any>{
    return this.http.get(URL+'/' + id);
  }

  getAll(): Observable<any> {
    return this.http.get(URL+'/list');
  }

  create(chip: Chip): Observable<any> {
    return this.http.post(URL + '/create', chip);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + '/delete/' + id);
  }

  update(id: number, chip: Chip): Observable<any> {
    return this.http.put(URL + '/update/' + id, chip);
  }

  getAllAndPage(params:any):Observable<any>{
    return this.http.get(URL,{params});
  }

  getOneProductChipByProductId(id: number):Observable<any>{
    return this.http.get(URL + '/get-one/' + id);
  }


  getCateProductChip():Observable<any>{
    return this.http.get(URL + '/list-chip');
  }


}
