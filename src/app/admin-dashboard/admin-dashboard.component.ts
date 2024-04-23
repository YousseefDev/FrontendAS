import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  allAdminRequests: any[] = [];
  pendingAdminRequests: any[] = [];
  allHRRequests: any[] = [];
  pendingHRRequests: any[] = [];

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {}

  loadAllAdminRequests(): void {
    this.apiService.getAdminRequests().subscribe(
      (requests: any[]) => {
        this.allAdminRequests = requests;
        this.pendingAdminRequests = []; // Clear pending requests when loading all admin requests
      },
      error => {
        console.error('Error fetching all admin requests:', error);
        // Handle error appropriately (e.g., display error message)
      }
    );
  }

  loadPendingAdminRequests(): void {
    this.apiService.getAdminPendingRequests().subscribe(
      (requests: any[]) => {
        this.pendingAdminRequests = requests;
        this.allAdminRequests = []; // Clear all admin requests when loading pending admin requests
      },
      error => {
        console.error('Error fetching pending admin requests:', error);
        // Handle error appropriately (e.g., display error message)
      }
    );
  }

  loadAllHRRequests(): void {
    this.apiService.getAllRequestsHR().subscribe(
      (requests: any[]) => {
        this.allHRRequests = requests;
        this.pendingHRRequests = []; // Clear pending HR requests when loading all HR requests
      },
      error => {
        console.error('Error fetching all HR requests:', error);
        // Handle error appropriately (e.g., display error message)
      }
    );
  }

  loadPendingHRRequests(): void {
    this.apiService.getPendingRequestsHR().subscribe(
      (requests: any[]) => {
        this.pendingHRRequests = requests;
        this.allHRRequests = []; // Clear all HR requests when loading pending HR requests
      },
      error => {
        console.error('Error fetching pending HR requests:', error);
        // Handle error appropriately (e.g., display error message)
      }
    );
  }

  updateRequestStatus(requestId: number, newStatus: string): void {
    this.apiService.updateRequestStatus(requestId, newStatus).subscribe(
      (updatedRequest: any) => {
        console.log(`Request ${requestId} status updated to '${newStatus}' successfully.`);
        // Reload requests based on the last loaded type (admin or HR)
        if (this.allAdminRequests.length > 0 || this.pendingAdminRequests.length > 0) {
          this.loadAllAdminRequests(); // Reload admin requests
        } else if (this.allHRRequests.length > 0 || this.pendingHRRequests.length > 0) {
          this.loadAllHRRequests(); // Reload HR requests
        }
      },
      error => {
        console.error(`Error updating request ${requestId} status:`, error);
        // Handle error appropriately (e.g., display error message)
      }
    );
  }

  getSenderFullName(request: any): string {
    return request.senderFullName || 'Unknown';
  }
}
