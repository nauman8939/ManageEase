import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private jsonUrl = 'http://localhost:8080/Products.json';

  constructor(private http: HttpClient) {} 

  getJsonData(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }

  searchProducts(query: string): Observable<any[]> {
    return this.getJsonData().pipe(
      map((data) => {
        return data.filter((product) =>
          product.productName.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  }
}
