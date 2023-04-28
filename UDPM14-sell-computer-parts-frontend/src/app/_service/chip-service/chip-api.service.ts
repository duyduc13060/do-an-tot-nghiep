import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL_CHIP = "http://localhost:8080/api/v1/chip";

@Injectable({
  providedIn: 'root'
})
export class ChipApiService {

constructor(
  private http: HttpClient
) { }

  getAllProductChipByCategoryId(id: number, params: any):Observable<any>{
    return this.http.get(URL_CHIP + '/product-chip/' + id, {params});
  }

  getOneProductChipByProductId(id: number):Observable<any>{
    return this.http.get(URL_CHIP + '/get-one/' + id);
  }

}
