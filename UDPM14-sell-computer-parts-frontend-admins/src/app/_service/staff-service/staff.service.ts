import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from 'src/app/_model/Staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  url = 'http://localhost:8080/api/v1/staff';

  constructor(private http: HttpClient) {}

  getAllStaff(): Observable<any>{
    return this.http.get(this.url + "/list");
  }

  getAllStaffById(id: number): Observable<any>{
    return this.http.get(this.url + "/" + id);
  }

  createStaff(staff: Staff): Observable<any>{
    return this.http.post(this.url + "/create", staff);
  }

  updateStaff(id: number, staff: Staff): Observable<any>{
    return this.http.put(this.url + "/update/" + id, staff);
  }

  deleteStaff(id: number): Observable<any>{
    return this.http.delete(this.url + "/delete/" + id);
  }
}
