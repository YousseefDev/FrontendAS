  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { AuthService } from './auth.service';
  @Injectable({
    providedIn: 'root'
  })
  export class ApiService {
    private baseUrl = 'http://localhost:8070/api/v1';

    getApiUrl(): string {
      return this.baseUrl;
    }
    private getHeaders(): HttpHeaders {
      const accessToken = this.authService.getCurrentUser();

      // Set the Authorization header with the access token
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      });
    }

    constructor(private http: HttpClient, private authService: AuthService) {}
    

    login(email: string, password: string) {
      const loginData = { email, password };
      return this.http.post<any>(`${this.baseUrl}/auth/login`, loginData);
    }

    createRequest(requestData: any): Observable<any> {
      const headers = this.getHeaders(); // Retrieve headers with access token
      return this.http.post<any>(`${this.baseUrl}/requests/Send-req`, requestData, { headers });
      }

      getMyRequests(): Observable<any[]> {
        const headers = this.getHeaders();
        return this.http.get<any[]>(`${this.baseUrl}/requests/my-requests`, { headers });
      }
      
  getAllRequestsHR(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/requests/Hr_req`, { headers });
  }

  getPendingRequestsHR(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/requests/RH-pending-requests`, { headers });
  }
 // New methods for Admin requests
 getAdminRequests(): Observable<any[]> {
  const headers = this.getHeaders();
  return this.http.get<any[]>(`${this.baseUrl}/requests/Admin_req`, { headers });
}

getAdminPendingRequests(): Observable<any[]> {
  const headers = this.getHeaders();
  return this.http.get<any[]>(`${this.baseUrl}/requests/Admin-pending-requests`, { headers });
}
  updateRequestStatus(requestId: number, newStatus: string): Observable<any> {
    const headers = this.getHeaders();
    const params = { newstatus: newStatus };
    return this.http.put<any>(`${this.baseUrl}/requests/${requestId}/status`, null, { headers, params });
  }
  }
