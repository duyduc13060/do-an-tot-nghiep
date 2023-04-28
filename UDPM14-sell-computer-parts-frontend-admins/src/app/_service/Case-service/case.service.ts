import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL_CASE = "http://localhost:8080/api/v1/case";

@Injectable({
  providedIn: 'root'
})
export class CaseService {


  constructor(
    private http: HttpClient
  ) { }

  getProductCaseByCategoryId(id: number,params: any): Observable<any> {
    return this.http.get(URL_CASE + "/product-case/" + id,{params});
  }

  getOneProductCaseWithProductId(id: number): Observable<any>{
    return this.http.get(URL_CASE + "/get-one/" + id);
  }


  getCateProductCase(): Observable<any> {
    return this.http.get(URL_CASE + '/list-case');
  }



}
