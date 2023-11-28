
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginData {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  // Add other properties if needed
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData: LoginData = { username: this.username, password: this.password };
    const loginUrl = 'http://localhost:8080/login';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<LoginResponse>(loginUrl, loginData, { headers, observe: 'response' }).subscribe(
      (response: HttpResponse<LoginResponse>) => {
        if (response.body?.success) {
          this.router.navigate(['cashier', 'cashier-dashboard']);
        } else {
          console.error('Login failed');
          alert('Invalid/Wrong Credentials');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
      }
    );
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
