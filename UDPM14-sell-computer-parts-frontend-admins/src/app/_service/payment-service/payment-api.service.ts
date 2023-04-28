import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL_PAYMENT = "http://localhost:8080/api/v1/payment";

@Injectable({
  providedIn: 'root'
})
export class PaymentApiService {

  constructor(
    private http: HttpClient
  ) { }


  getAllPayment(): Observable<any> {
    return this.http.get(URL_PAYMENT + '/list');
  }


  getOne(id:number): Observable<any>{
    return this.http.get(URL_PAYMENT + '/' + id);
  }

  createPayment(payment: any, file?: any): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('name',payment.name);
    formData.append('image',payment.image)
    formData.append("description",payment.description);

    return this.http.post(URL_PAYMENT + "/create",formData);

  }

  editPayment(id: number, payment: any, file?: any): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('name',payment.name);
    formData.append('image',payment.image)
    formData.append("description",payment.description);

    return this.http.put(URL_PAYMENT + "/update/" + id,formData);

  }

  deletePayment(id: number):Observable<any>{
    return this.http.delete(URL_PAYMENT + "/delete/"+ id);
  }






}
