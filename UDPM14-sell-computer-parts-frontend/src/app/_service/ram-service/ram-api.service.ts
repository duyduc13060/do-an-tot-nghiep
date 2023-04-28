import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL_RAM = 'http://localhost:8080/api/v1/ram';

@Injectable({
  providedIn: 'root'
})
export class RamApiService {

constructor(
  private rest: HttpClient
) { }

  getAllProductRamWithCategoryId(id: number,params:any):Observable<any>{
    return this.rest.get(URL_RAM + "/product-ram/" + id,{params});
  }

  getOneProductRamWithProductId(id: number):Observable<any>{
    return this.rest.get(URL_RAM + "/get-one/" + id);
  }


}
