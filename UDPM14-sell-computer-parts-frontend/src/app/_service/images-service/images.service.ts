import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  url = "http://localhost:8080/api/v1/images";

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<any> {
    return this.http.get(this.url + "/list");
  }

  getImagesByProductId(id: number): Observable<any> {
    return this.http.get(this.url + "/product-id/" + id);
  }
}
