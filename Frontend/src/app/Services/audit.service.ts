import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Audit } from '../Models/Audit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private baseUrl = 'http://localhost:8080/audit';

  constructor(private http: HttpClient) { }

  // ✅ Create Audit (ADMIN, SHIFT_IN_CHARGE)
  createAudit(audit: Audit, token: string): Observable<Audit> {
    return this.http.post<Audit>(this.baseUrl, audit, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ✅ Get All Audits (All roles)
  getAllAudits(token: string): Observable<Audit[]> {
    return this.http.get<Audit[]>(this.baseUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ✅ Get Audit by ID (All roles)
  getAuditById(id: string, token: string): Observable<Audit> {
    return this.http.get<Audit>(`${this.baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ✅ Update Audit (ADMIN, SHIFT_IN_CHARGE)
  updateAudit(id: string, audit: Audit, token: string): Observable<Audit> {
    return this.http.put<Audit>(`${this.baseUrl}/${id}`, audit, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ✅ Delete Audit (ADMIN only)
  deleteAudit(id: string, token: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ✅ Filter Audits by Status (All roles)
  getAuditsByStatus(status: string, token: string): Observable<Audit[]> {
    return this.http.get<Audit[]>(`${this.baseUrl}/status/${status}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ✅ Filter Audits by Location (All roles)
  getAuditsByLocation(location: string, token: string): Observable<Audit[]> {
    return this.http.get<Audit[]>(`${this.baseUrl}/location/${location}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ✅ Filter Audits by Date Range (All roles)
  getAuditsByDateRange(start: string, end: string, token: string): Observable<Audit[]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);

    return this.http.get<Audit[]>(`${this.baseUrl}/date-range`, {
      headers: { Authorization: `Bearer ${token}` },
      params
    });
  }
  
}
