import { Component, Inject, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboardjson.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  username: any;
  jsonData: any[] = [];
  filteredProducts: any[] = [];
  searchControl = new FormControl();

  constructor(@Inject(DashboardService) private dashboardservice: DashboardService, private router: Router) {}

  ngOnInit(): void {
    const sessionToken: string = localStorage.getItem('token') ?? '';

    if (!sessionToken) {
      this.router.navigate(['/login']);
    }
    const decodedToken: any = jwtDecode(sessionToken);
    this.username = decodedToken.sub;

    this.dashboardservice.getJsonData().subscribe((data: any[]) => {
      this.jsonData = data;
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => {
          return this.dashboardservice.searchProducts(query);
        })
      )
      .subscribe(
        (result: any[]) => {
          this.filteredProducts = result;

          if (result.length === 0) {
            Swal.fire({
              icon: 'info',
              title: 'No results found',
              text: 'Please refine your search criteria.',
            });
          }
        },
        error => {
          console.error('Error fetching filtered Products:', error);
        }
      );
  }

  logOutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
