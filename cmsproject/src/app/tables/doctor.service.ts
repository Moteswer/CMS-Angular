import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Doctor } from '../tables/doctor';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:8000';
  private url = 'http://127.0.0.1:8000';

  constructor(private httpClient: HttpClient,private http: HttpClient) { }

  getDoctors(): Observable<Doctor[]> {
    return this.httpClient.get<Doctor[]>(`${this.apiUrl}/doctors/`);
  }

  addDoctor(doctor: Doctor): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/doctors/`, doctor);
  }

  checkEmailExistsInDoctorTable(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/api/check-email-doctor`, { params: { email } });
  }

  checkPhoneNumberExistsInDoctorTable(phone_number: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/api/check-phone-number-doctor`, { params: { phone_number } });
  }

  updateDoctor(doctor_id: number, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}/doctors/${doctor_id}/`;
    return this.http.put(url, updatedData);
  }

  updateDoctorIsActive(doctorId: number, isActive: boolean): Observable<any> {
    const url = `${this.url}/doctor/${doctorId}/isActive`;
    return this.http.put(url, { is_active: isActive }).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling function
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }

  getDutyTime(doctorId: string): Observable<string> {
    // Assuming you have an API endpoint to fetch duty time for a doctor
    return this.http.get<string>(`${this.url}/doctors/${doctorId}/duty-time`);
  }

  getDoctorById(doctorId: number): Observable<any> {
    const url = `${this.apiUrl}/doctors/${doctorId}/`;
    return this.http.get<any>(url);
  }

  updatePassword(doctorId: number, newPassword: string): Observable<any> {
    const url = `${this.apiUrl}/api/doctors/password/${doctorId}/`;
    return this.http.put(url, { new_password: newPassword });
  }

  getDoctorIdByEmail(email: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/api/doctors/get_id_by_email/${email}`);
  }
}
