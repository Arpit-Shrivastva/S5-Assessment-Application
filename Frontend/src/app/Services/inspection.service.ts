import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionSheet } from '../Models/InspectionSheet';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  private baseUrl = 'http://localhost:8080/inspection';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // or sessionStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // ✅ Save a new inspection
  saveInspection(sheet: InspectionSheet): Observable<any> {
    return this.http.post(`${this.baseUrl}`, sheet, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ Get all inspections
  getAllInspections(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ Delete by ID
  deleteInspection(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ Get inspections by auditor name
  getInspectionsByAuditor(auditor: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/auditor/${encodeURIComponent(auditor)}`, {
      headers: this.getAuthHeaders()
    });
  }
  
}
