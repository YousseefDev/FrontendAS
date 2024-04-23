// src/app/login/login.component.ts

import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { HrDashboardComponent } from '../hr-dashboard/hr-dashboard.component';
import { EmployeeDashboardComponent } from '../employee-dashboard/employee-dashboard.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginError: string = '';

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {}

  login(email: string, password: string): void {
    this.apiService.login(email, password).subscribe(
      (response: any) => {
        console.log('Access token:', response.access_token); // Check the received access token
        const accessToken = response.access_token;
        this.authService.setCurrentUser(accessToken);
  
        // Determine which dashboard to navigate based on user role
        if (this.authService.isAdmin()) {
          this.router.navigate([AdminDashboardComponent]);
        } else if (this.authService.isHR()) {
          this.router.navigate([HrDashboardComponent]);
        } else {
          this.router.navigate([EmployeeDashboardComponent]);
        }
      },
      error => {
        console.error('Login error:', error);
        this.loginError = 'Invalid email or password.';
      }
    );
    
  }
  
  
}
