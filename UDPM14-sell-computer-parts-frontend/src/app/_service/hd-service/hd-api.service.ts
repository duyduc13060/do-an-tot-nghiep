import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL_HD = "http://localhost:8080/api/v1/hd";
@Injectable({
  providedIn: 'root'
})
export class HdApiService {

constructor(
  private http: HttpClient
) { }

getProductHdByCategoryId(id: number,params: any): Observable<any> {
  return this.http.get(URL_HD + "/product-hd/" + id,{params});
}

getOneProductHdWithProductId(id: number): Observable<any>{
  return this.http.get(URL_HD + "/get-one/" + id);
}


}
