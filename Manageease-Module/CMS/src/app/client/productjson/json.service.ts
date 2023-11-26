import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  private jsonUrl = 'http://localhost:8080/Products.json'; 

  constructor(private http: HttpClient) { }

  getJsonData(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }
}
