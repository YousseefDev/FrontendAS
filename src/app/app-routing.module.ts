// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'hr', component: HrDashboardComponent, canActivate: [AuthGuard], data: { roles: ['HUMAN_RESOURCE'] } },
  { path: 'employee', component: EmployeeDashboardComponent, canActivate: [AuthGuard], data: { roles: ['EMPLOYEE'] } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
