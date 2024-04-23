import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss']
})
export class HrDashboardComponent implements OnInit {
  allRequests: any[] = [];
  pendingRequests: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  loadAllRequests(): void {
    this.apiService.getAllRequestsHR().subscribe(
      (requests: any[]) => {
        this.allRequests = requests;
        this.pendingRequests = []; // Clear pending requests when loading all requests
      },
      error => {
        console.error('Error fetching all requests:', error);
        // Handle error appropriately (e.g., display error message)
      }
    );
  }

  loadPendingRequests(): void {
    this.apiService.getPendingRequestsHR().subscribe(
      (requests: any[]) => {
        this.pendingRequests = requests;
        this.allRequests = []; // Clear all requests when loading pending requests
      },
      error => {
        console.error('Error fetching pending requests:', error);
        // Handle error appropriately (e.g., display error message)
      }
    );
  }

  updateRequestStatus(requestId: number, newStatus: string): void {
    this.apiService.updateRequestStatus(requestId, newStatus).subscribe(
      (updatedRequest: any) => {
        console.log(`Request ${requestId} status updated to '${newStatus}' successfully.`);
        // Reload requests based on the last loaded type (all or pending)
        if (this.allRequests.length > 0) {
          this.loadAllRequests();
        } else if (this.pendingRequests.length > 0) {
          this.loadPendingRequests();
        }
      },
      error => {
        console.error(`Error updating request ${requestId} status:`, error);
        // Handle error appropriately (e.g., display error message)
      }
    );
  }

  // Helper method to display sender's full name
  getSenderFullName(request: any): string {
    return request.senderFullName || 'Unknown';
  }
}
