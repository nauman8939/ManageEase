// stations.component.ts

import { Component, OnInit } from '@angular/core';
import { StationService } from '../stations/stationjson.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  jsonData: any[] = [];
  filteredStations: any[] = [];
  searchControl = new FormControl();

  constructor(private StationService: StationService) {}

  ngOnInit(): void {
    this.StationService.getJsonData().subscribe((data: any[]) => {
      this.jsonData = data;
      this.filteredStations = data;
    });

    // React to changes in the search input
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => {
          return this.StationService.searchStations(query);
        })
      )
      .subscribe(
        (result: any[]) => {
          this.filteredStations = result;

          if (result.length === 0) {
            Swal.fire({
              icon: 'info',
              title: 'No results found',
              text: 'Please refine your search criteria.',
            });
          }
        },
        error => {
          console.error('Error fetching filtered stations:', error);
        }
      );
  }
}
