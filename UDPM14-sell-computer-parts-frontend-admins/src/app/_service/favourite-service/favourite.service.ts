import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favourite } from 'src/app/_model/favourite';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  url = "http://localhost:8080/api/v1/favorite";

  constructor(private http: HttpClient) { }


  getAllFavoutite(): Observable<any> {
    return this.http.get(this.url + "/list");
  }

  getFavouriteById(id: number): Observable<any> {
    return this.http.get(this.url + "/" + id);
  }

  createFavourite(id: number, fav: Favourite): Observable<any> {
    return this.http.post(this.url + "/" + id, fav);
  }

  deleteFavourite(id: number): Observable<any> {
    return this.http.delete(this.url + "/" + id);
  }
}
