import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  url = 'http://localhost:8080/api/v1/color';
  constructor(private httpClient: HttpClient) { }
  getHeader() {
    const token = localStorage.getItem("auth-token");
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;}
  getAll():Observable<any> {
    let headers = this.getHeader();
    if (headers instanceof HttpHeaders)
    {
      return this.httpClient.get(this.url ,{ headers: headers });
    }else{
      return this.httpClient.get(this.url );
    }

  }
  post(color:any):Observable<any>  {
    let headers = this.getHeader();
    if (headers instanceof HttpHeaders)
    {
      return this.httpClient.post(this.url , color ,{ headers: headers });
    }else{
        return this.httpClient.get(this.url );
      }
  }
  put(id:any, item:any):Observable<any> {
    let headers = this.getHeader();
    if (headers instanceof HttpHeaders)
    {
      return this.httpClient.put(this.url+"/"+id, item ,{ headers: headers });

    }else{
      return this.httpClient.put(this.url+ "/"+id, item);
    }

  }
  getOne(id:number):Observable<any> {

    return this.httpClient.get(this.url+"/"+id);
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
