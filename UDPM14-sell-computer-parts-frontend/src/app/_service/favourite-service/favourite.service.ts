import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FavouriteModel } from 'src/app/Model/FavouriteModel';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  url = "http://localhost:8080/api/v1/favorite";

  constructor(private http: HttpClient) { }

  getFavouriteByUser(): Observable<any> {
    return this.http.get(this.url + "/list");
  }

  getAllFavourite(): Observable<any> {
    return this.http.get(this.url + "/product-favorite");
  }

  createFavourite(fav: FavouriteModel): Observable<any> {
    return this.http.post(this.url + "/" + fav.productId, fav);
  }

  addFavourite(id: number): Observable<any> {
    return this.http.post(this.url + "/" + id,null);
  }

  deleteFavourite(id: number): Observable<any> {
    return this.http.delete(this.url + "/delete/" + id);
  }

  getTopFavourite(): Observable<any> {
    return this.http.get(this.url + "/product-favorite");
  }
}
