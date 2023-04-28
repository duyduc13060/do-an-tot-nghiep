import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = "http://localhost:8080/api/v1/category";

  constructor(private http: HttpClient) { }

  getAllCategory(page: number, pageSize: number): Observable<any> {
    return this.http.get(this.url + "?page=" + page + "&page-size=" + pageSize);
  }

  getByCategoryId(id: number): Observable<any> {
    return this.http.get(this.url + "/" + id);
  }

  getAllCategoryByGroupId(id:number):Observable<any>{
    return this.http.get(this.url + "/list-group/" + id );
  }

}
