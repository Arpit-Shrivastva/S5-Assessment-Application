import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  private baseUrl = 'http://localhost:8080/api'; // ✅ Update with your backend host

  constructor(private http: HttpClient) { }

  // 🔐 Register new user
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

  // 🔐 Login user and receive token + role + name
  login(user: User): Observable<{ token: string, role: string, name: string }> {
    return this.http.post<{ token: string, role: string, name: string }>(`${this.baseUrl}/logIn`, user);
  }

  // 🔐 Get all users (ADMIN only)
  getAllUsers(token: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/all`, {
      headers: this.getAuthHeaders(token)
    });
  }

  // 🔐 Get user by email (ADMIN / SHIFT_IN_CHARGE)
  getUserByEmail(email: string, token: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${email}`, {
      headers: this.getAuthHeaders(token)
    });
  }

  // 🔐 Update user by email (ADMIN / SHIFT_IN_CHARGE)
  updateUser(email: string, user: User, token: string): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${email}`, user, {
      headers: this.getAuthHeaders(token)
    });
  }

  // 🔐 Update password (authenticated users)
  updatePassword(email: string, user: User): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/password/${email}`, user);
  }
  
  

  // 🔐 Delete user (ADMIN only)
  deleteUser(email: string, token: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${email}`, {
      headers: this.getAuthHeaders(token)
    });
  }

  // ✅ Helper: Create authorization header
  private getAuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
  }
}
