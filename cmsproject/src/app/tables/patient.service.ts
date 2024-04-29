import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from './patient';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:8000';
  private url = 'http://127.0.0.1:8000';

  constructor(private httpClient: HttpClient,private http: HttpClient) { }
  

  addPatient(patient: Patient): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/patients/`, patient);
  }

  getPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(`${this.apiUrl}/patients/`);
  }

  getPatientDetails(patientId: number): Observable<Patient> {
    const url = `${this.apiUrl}/patients/${patientId}/`; // Construct the URL
    return this.http.get<Patient>(url); // Make a GET request to fetch patient details
  }

  checkEmailExistsInPatientTable(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/api/check-email-patient`, { params: { email } });
  }

  checkPhoneNumberExistsInPatientTable(phone_number: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/api/check-phone-number-patient`, { params: { phone_number } });
  }

  updatePatient(patient_id: number, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}/patients/${patient_id}/`;
    return this.http.put(url, updatedData);
  }

  updatePatientIsActive(patientId: number, isActive: boolean): Observable<any> {
    const url = `${this.url}/patient/${patientId}/isActive`;
    return this.http.put(url, { is_active: isActive }).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling function
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }

  fetchPatientDetails(phoneNumber: string): Observable<any> {
    const url = `${this.apiUrl}/patient-details/${phoneNumber}/`;
    return this.http.get<any>(url);
  }
}

