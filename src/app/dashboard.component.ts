// src/app/dashboard.component.ts

import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div *ngIf="authService.isLoggedIn(); else loginTemplate">
      <div *ngIf="authService.isAdmin()">
        <app-admin-dashboard></app-admin-dashboard>
      </div>
      <div *ngIf="authService.isHR()">
        <app-hr-dashboard></app-hr-dashboard>
      </div>
      <div *ngIf="!authService.isAdmin() && !authService.isHR()">
        <app-employee-dashboard></app-employee-dashboard>
      </div>
      <button (click)="logout()">Logout</button>
    </div>
    <ng-template #loginTemplate>
      <app-login></app-login>
    </ng-template>
  `
})
export class DashboardComponent {
  constructor(public authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }
}
