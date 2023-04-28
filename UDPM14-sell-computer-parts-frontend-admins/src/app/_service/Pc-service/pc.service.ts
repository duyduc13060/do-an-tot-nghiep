import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL_PC = "http://localhost:8080/api/v1/pc";

@Injectable({
  providedIn: 'root'
})
export class PcService {

constructor(
  private http: HttpClient
) { }

getOneProductPCByProductId(id:any):Observable<any>{
  return this.http.get(URL_PC + '/product/' + id);
}

listPc(params:any):Observable<any>{
  return this.http.get(URL_PC,{params});
}


}
