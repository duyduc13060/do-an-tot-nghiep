import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Brands } from '../common/Brands';
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  url = 'http://localhost:8080/api/v1/brand';

  constructor(private httpClient: HttpClient) { }
  getHeader() {
    const token = localStorage.getItem("auth-token");
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;}
  getAll():Observable<any> {
    let headers = this.getHeader();
    if (headers instanceof HttpHeaders)
    {
      return this.httpClient.get(this.url  ,{ headers: headers });
    }else{
      return this.httpClient.get(this.url );
    }

  }

  getOne(id:number):Observable<any> {
    return this.httpClient.get(this.url+'/'+id);
  }

  post(brands:any):Observable<any>  {
    let headers = this.getHeader();
    if (headers instanceof HttpHeaders)
    {
      return this.httpClient.post(this.url, brands ,{ headers: headers });
    }else{
      return this.httpClient.post(this.url , brands);
    }

  }

  put(id:number, item:any):Observable<any> {
    return this.httpClient.put(this.url+'/'+id, item);
  }

  delete(id:number): Observable<any> {
    let headers = this.getHeader();
    if (headers instanceof HttpHeaders)
    {
    return this.httpClient.delete(this.url+'/'+id,{ headers: headers });
  }else{
    return this.httpClient.post(this.url+"/" , id);
  }
  }
}
