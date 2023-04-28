import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  url = "http://localhost:8080/api/v1/voucher";

  constructor(private http: HttpClient) { }

  getAllVoucher(): Observable<any> {
      return this.http.get(this.url);
  }

}
