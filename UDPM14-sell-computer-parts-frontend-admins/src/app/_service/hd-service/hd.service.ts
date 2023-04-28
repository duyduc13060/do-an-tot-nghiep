import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HdService {



  url = 'http://localhost:8080/api/v1/hd';

  constructor(private httpClient: HttpClient) { }
  getHeader() {
    const token = localStorage.getItem("auth-token");
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;
  }
  getAll(): Observable<any> {
    let headers = this.getHeader();
    if (headers instanceof HttpHeaders) {
      return this.httpClient.get(this.url, { headers: headers });
    } else {
      return this.httpClient.get(this.url);
    }

  }

  getOne(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }

  post(item: any): Observable<any> {
    let headers = this.getHeader();
    if (headers instanceof HttpHeaders) {
      return this.httpClient.post(this.url + "/create", item, { headers: headers });
    } else {
      return this.httpClient.post(this.url + "/create", item);
    }

  }

  put(id: any, item: any): Observable<any> {
    return this.httpClient.put(this.url + '/update/' + id, item);
  }

  delete(id: number): Observable<any> {
    let headers = this.getHeader();
    if (headers instanceof HttpHeaders) {
      return this.httpClient.delete(this.url + '/delete/' + id, { headers: headers });
    } else {
      return this.httpClient.post(this.url + "/delete/", id);
    }
  }

  getCaseProductHd(): Observable<any> {
    return this.httpClient.get(this.url + '/list-hd');
  }


}
