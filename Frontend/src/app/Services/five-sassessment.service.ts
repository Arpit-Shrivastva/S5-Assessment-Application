import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FiveSAssessment } from '../Models/FiveSAssessment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiveSAssessmentService {

  private baseUrl = 'http://localhost:8080/assessment'; // Adjust base URL if needed

  constructor(private http: HttpClient) { }

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // ✅ Create new assessment (Admin, Shift in charge)
  createAssessment(assessment: FiveSAssessment, token: string): Observable<FiveSAssessment> {
    return this.http.post<FiveSAssessment>(`${this.baseUrl}`, assessment, {
      headers: this.getHeaders(token)
    });
  }

  // ✅ Get all assessments (All roles)
  getAllAssessments(token: string): Observable<FiveSAssessment[]> {
    return this.http.get<FiveSAssessment[]>(`${this.baseUrl}`, {
      headers: this.getHeaders(token)
    });
  }

  // ✅ Get assessment by ID (All roles)
  getAssessmentById(id: string, token: string): Observable<FiveSAssessment> {
    return this.http.get<FiveSAssessment>(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(token)
    });
  }

  // ✅ Update assessment (Admin, Shift in charge)
  // updateAssessment(id: string, updated: FiveSAssessment, token: string): Observable<FiveSAssessment> {
  //   return this.http.put<FiveSAssessment>(`${this.baseUrl}/${id}`, updated, {
  //     headers: this.getHeaders(token)
  //   });
  // }

  // ✅ Delete assessment (Admin only)
  // deleteAssessment(id: string, token: string): Observable<string> {
  //   return this.http.delete(`${this.baseUrl}/${id}`, {
  //     headers: this.getHeaders(token),
  //     responseType: 'text' as 'json' // Because backend returns plain string
  //   });
  // }

  // ✅ Filter by auditor
  getByAuditor(auditor: string, token: string): Observable<FiveSAssessment[]> {
    return this.http.get<FiveSAssessment[]>(`${this.baseUrl}/auditor/${auditor}`, {
      headers: this.getHeaders(token)
    });
  }

  // ✅ Filter by scope
  getByScope(scope: string, token: string): Observable<FiveSAssessment[]> {
    return this.http.get<FiveSAssessment[]>(`${this.baseUrl}/scope/${scope}`, {
      headers: this.getHeaders(token)
    });
  }

}
