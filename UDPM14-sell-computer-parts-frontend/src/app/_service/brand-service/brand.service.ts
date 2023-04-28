import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  url = "http://localhost:8080/api/v1/brand";

  constructor(private http: HttpClient) { }

  getAllBrand(): Observable<any> {
      return this.http.get(this.url);
  }
}
