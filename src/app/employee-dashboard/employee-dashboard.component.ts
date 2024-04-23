import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
  requestTypes: string[] = ['Auth', 'Leave', 'Loan', 'P_situation', 'Document', 'Job Transfer'];
  selectedRequestType: string = '';
  requestTitle: string = '';
  requestDescription: string = '';
  showTypeButtons: boolean = true;
  showMyRequests: boolean = false;
  myRequests: any[] = [];

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {}

  selectRequestType(type: string): void {
    this.selectedRequestType = type;
    this.showTypeButtons = false;
  }

  createRequest(): void {
    if (!this.selectedRequestType || !this.requestTitle || !this.requestDescription) {
      alert('Please select a request type and provide a title and description.');
      return;
    }

    const requestData = {
      typeRequest: this.selectedRequestType,
      title: this.requestTitle,
      description: this.requestDescription,
      status: 'Pending',
      senderFullName: this.authService.getCurrentUserFullName() // Get sender's full name from AuthService
    };

    this.apiService.createRequest(requestData).subscribe(
      (createdRequest: any) => {
        console.log('Request created successfully:', createdRequest);
        this.selectedRequestType = '';
        this.requestTitle = '';
        this.requestDescription = '';
        this.showTypeButtons = true; // Show type selection buttons again
      },
      error => {
        console.error('Error creating request:', error);
        // Handle error appropriately (e.g., display error message)
      }
    );
  }

  loadMyRequests(): void {
    this.apiService.getMyRequests().subscribe(
      (requests: any[]) => {
        this.myRequests = requests;
        this.showMyRequests = true;
      },
      error => {
        console.error('Error fetching requests:', error);
        // Handle error appropriately (e.g., display error message)
      }
    );
  }

  goBack(): void {
    this.showMyRequests = false;
  }

  resetRequestType(): void {
    this.selectedRequestType = '';
    this.showTypeButtons = true;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Approved':
        return 'lightgreen';
      case 'Denied':
        return 'lightcoral';
      case 'Pending':
        return 'orange';
      default:
        return 'white';
    }
  }
}
