import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface LoginData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData: LoginData = { username: this.username, password: this.password };
    const loginUrl = 'http://localhost:8080/adminlogin';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ success: boolean; token: string }>(loginUrl, loginData, { headers, observe: 'response' }).subscribe(
      (response: HttpResponse<{ success: boolean; token: string }>) => {
        if (response.body?.success) {
          // Store the token in localStorage
          localStorage.setItem('token', response.body.token);
          this.router.navigate(['/adminhome']); // Redirect to 'home' after successful login
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
}
