import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL_PSU = "http://localhost:8080/api/v1/psu";

@Injectable({
  providedIn: 'root'
})
export class PsuApiService {

constructor(
  private http: HttpClient
) { }

getProductPsuByCategoryId(id: number,params: any): Observable<any> {
  return this.http.get(URL_PSU + "/product-psu/" + id,{params});
}

getOneProductPsuWithProductId(id: number): Observable<any>{
  return this.http.get(URL_PSU + "/get-one/" + id);
}

}
