import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Groupcomponent } from '../../common/Groupcomponent';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupComponentService {
  url = 'http://localhost:8080/api/v1/component';

  constructor(private httpClient: HttpClient) { }

  getAllGroupComponet(): Observable<any> {
      return this.httpClient.get(this.url + "/info");
  }

  getHeader() {
    const token = localStorage.getItem("auth-token");
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;}
  getAll():Observable<any> {
    let headers = this.getHeader();
    if (headers instanceof HttpHeaders)
    {
      return this.httpClient.get(this.url + "/info/" ,{ headers: headers });
    }else{
      return this.httpClient.get(this.url + "/info/");
    }

  }
  post(Groupcomponent:Groupcomponent):Observable<any>  {
    let headers = this.getHeader();
    if (headers instanceof HttpHeaders)
    {
      return this.httpClient.post(this.url+"/create", Groupcomponent ,{ headers: headers });
    }else{
      return this.httpClient.post(this.url + "/create", Groupcomponent);
    }

  }
  put(id:any, item:any):Observable<any> {
    let headers = this.getHeader();
    if (headers instanceof HttpHeaders)
    {
      return this.httpClient.put(this.url+"/update/"+id, item ,{ headers: headers });

    }else{
      return this.httpClient.put(this.url+ "/update/"+id, item);
    }

  }
  getOne(id:number):Observable<any> {

      return this.httpClient.get(this.url+"/"+id);


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
