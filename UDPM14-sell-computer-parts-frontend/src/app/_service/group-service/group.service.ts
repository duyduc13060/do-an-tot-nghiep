import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  url = "http://localhost:8080/api/v1/component";

  constructor(private http: HttpClient) { }

  getAllGroupComponet(): Observable<any> {
      return this.http.get(this.url + "/info");
  }
}
