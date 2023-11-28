import { Component ,OnInit} from '@angular/core';
import { JsonService } from '../productjson/json.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit{
username: any;
  constructor(private router: Router) {}
  ngOnInit(): void {
    const sessionToken: string = localStorage.getItem('token') ?? ''; 

    if(!sessionToken){
      this.router.navigate(['/login']);
    }
    const decodedToken: any = jwtDecode(sessionToken);
    this.username = decodedToken.sub;
  }
  logOutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
