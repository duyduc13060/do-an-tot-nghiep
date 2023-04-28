import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {


  url = 'http://localhost:8080/api/v1/main';

  constructor(private httpClient: HttpClient) { }
  getHeader() {
    const token = localStorage.getItem("auth-token");
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;}
    getAllMain(page: number, pageSize: number): Observable<any> {
      let param = new HttpParams();
      param = param.append('page', page);
      param = param.append('page-number', pageSize);

      return this.httpClient.get(this.url + '?page=' + page + '&page-number=' + pageSize, { params: param });
    }

  getOne(id:number):Observable<any> {
    return this.httpClient.get(this.url+'/'+id);
  }

  post(item:any):Observable<any>  {
    let headers = this.getHeader();
    if (headers instanceof HttpHeaders)
    {
      return this.httpClient.post(this.url+"/create", item ,{ headers: headers });
    }else{
      return this.httpClient.post(this.url+"/create" , item);
    }

  }

  put(id:any, item:any):Observable<any> {
    return this.httpClient.put(this.url+'/update/'+id, item);
  }

  delete(id:number): Observable<any> {
    let headers = this.getHeader();
    if (headers instanceof HttpHeaders)
    {
    return this.httpClient.delete(this.url+'/delete/'+id,{ headers: headers });
  }else{
    return this.httpClient.post(this.url+"/delete/" , id);
  }
  }
}
