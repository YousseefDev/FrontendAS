import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'currentUser';

  constructor() { }

  setCurrentUser(token: string): void {
    localStorage.setItem(this.USER_KEY, token);
  }

  getCurrentUser(): string | null {
    return localStorage.getItem(this.USER_KEY);
  }

  private getTokenPayload(token: string): any {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode token payload
      return tokenPayload;
    } catch (error) {
      console.error('Error parsing token payload:', error);
      return null;
    }
  }

  getCurrentUserRole(): string | null {
    const token = this.getCurrentUser();
    if (token) {
      const tokenPayload = this.getTokenPayload(token);
      if (tokenPayload && tokenPayload.scope && Array.isArray(tokenPayload.scope) && tokenPayload.scope.length > 0) {
        return tokenPayload.scope[0].substring(5); // Extract role from 'ROLE_X' format
      } else {
        console.error('Invalid token payload:', tokenPayload);
      }
    }
    return null;
  }
  getCurrentUserEmail(): string | null {
    const token = this.getCurrentUser();
    if (token) {
      const tokenPayload = this.getTokenPayload(token);
      return tokenPayload && tokenPayload.sub ? tokenPayload.sub : null; // Extract email from 'sub' claim
    }
    return null;
  }
  getCurrentUserFullName(): string | null {
    const token = this.getCurrentUser();
    if (token) {
      const tokenPayload = this.getTokenPayload(token);
      if (tokenPayload && tokenPayload.name) {
        return tokenPayload.name; // Retrieve full name from token payload
      } else {
        console.error('Full name not found in token payload:', tokenPayload);
      }
    }
    return null;
  }
  isAdmin(): boolean {
    return this.getCurrentUserRole() === 'ADMIN';
  }

  isHR(): boolean {
    return this.getCurrentUserRole() === 'HUMAN_RESOURCE';
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}
