import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  url = "http://localhost:8080/api/v1/color";

  constructor(private http: HttpClient) { }

  getAllColor(): Observable<any> {
      return this.http.get(this.url);
  }
}
