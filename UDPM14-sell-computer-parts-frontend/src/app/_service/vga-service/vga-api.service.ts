import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL_VGA = "http://localhost:8080/api/v1/vga";

@Injectable({
  providedIn: 'root'
})
export class VgaApiService {

constructor(
  private http: HttpClient
) { }

getProductVgaByCategoryId(id: number,params: any): Observable<any> {
  return this.http.get(URL_VGA + "/product-vga/" + id,{params});
}

getOneProductVgaWithProductId(id: number): Observable<any>{
  return this.http.get(URL_VGA + "/get-one/" + id);
}

}
