// stationjson.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  private jsonUrl = 'http://localhost:8080/Stations.json'; 

  constructor(private http: HttpClient) { }

  getJsonData(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }

  searchStations(query: string): Observable<any[]> {
    return this.getJsonData().pipe(
      map(data => {
        // Perform local search on the obtained data
        return data.filter(station => 
          station.location.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  }
}
