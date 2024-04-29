import { Injectable } from '@angular/core';
import { Test } from './test';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  insertTest(testData: Test): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}tests/`, testData);
  }

  private apiUrl = 'http://127.0.0.1:8000/'; // Common base URL

  constructor(private http: HttpClient) { }

  getAllTests(): Observable<Test[]> {
    const url = `${this.apiUrl}tests/`;
    return this.http.get<Test[]>(url);
  }

  getTestById(id: number): Observable<Test> {
    const url = `${this.apiUrl}tests/${id}/`;
    return this.http.get<Test>(url);
  }

  updateTest(test: Test): Observable<Test> {
    const url = `${this.apiUrl}tests/${test.test_id}/`;
    return this.http.put<Test>(url, test);
  }

  toggleActiveTest(id: number): Observable<any> {
    const url = `${this.apiUrl}toggle/${id}/`;
    return this.http.put<any>(url, null); // Sending a PUT request with null body
  }

  getAllDiagnosisDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/diagnosis/`);
  }

  getPatientDetails(patientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/patients/${patientId}/`);
  }

  getDoctorDetails(doctorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/doctors/${doctorId}/`);
  }

  getAllDiagnosisWithDetails(): Observable<any[]> {
    return this.getAllDiagnosisDetails().pipe(
      switchMap(diagnosisList => {
        const requests: Observable<any>[] = [];
        diagnosisList.forEach(diagnosis => {
          const patientRequest = this.getPatientDetails(diagnosis.patient);
          const doctorRequest = this.getDoctorDetails(diagnosis.doctor);
          requests.push(patientRequest, doctorRequest);
        });
        return forkJoin(requests).pipe(
          map(response => {
            const combinedResults: any[] = [];
            for (let i = 0; i < response.length; i += 2) {
              combinedResults.push({
                diagnosis: diagnosisList[i / 2],
                patient: response[i],
                doctor: response[i + 1]
              });
            }
            return combinedResults;
          })
        );
      })
    );
  }
}
