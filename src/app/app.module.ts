import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule for routing
import { FormsModule } from '@angular/forms'; // Import FormsModule if needed
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule if needed
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component'; // Import DashboardComponent
import { AppRoutingModule } from './app-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    HrDashboardComponent,
    EmployeeDashboardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]), // Configure routes here
    FormsModule, // Include FormsModule if using ngModel in forms
    HttpClientModule, // Include HttpClientModule for making HTTP requests
    AppRoutingModule // Import AppRoutingModule

  ],
  providers: [ApiService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
