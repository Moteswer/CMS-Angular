import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Test } from './test';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  private url = 'http://127.0.0.1:8000'

  constructor(private http: HttpClient) { }

  getAllDiagnosisDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/diagnosis/`);
  }

  getPatientDetails(patientId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/patients/${patientId}/`);
  }

  getDoctorDetails(doctorId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/doctors/${doctorId}/`);
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

  saveBillDetails(details: any): Observable<any> {
    const apiUrl = `${this.url}/api/bills/`; // Assuming your API endpoint is '/api/bills/'
    return this.http.post<any>(apiUrl, details);
  }

  getBillDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/bill/`);
  }

  getDiagnosisDetails(): Observable<any[]> {
    return this.getAllDiagnosisDetails().pipe(
      switchMap(diagnosisList => {
        const requests: Observable<any>[] = [];
        diagnosisList.forEach(diagnosis => {
          const patientRequest = this.getPatientDetails(diagnosis.patient);
          const doctorRequest = this.getDoctorDetails(diagnosis.doctor);
          const testRequest = this.getAllTests(); // Add this line
          requests.push(patientRequest, doctorRequest, testRequest); // Modify this line
        });
        return forkJoin(requests).pipe(
          map(response => {
            const combinedResults: any[] = [];
            for (let i = 0; i < response.length; i += 3) { // Modify this line
              combinedResults.push({
                diagnosis: diagnosisList[i / 3], // Modify this line
                patient: response[i],
                doctor: response[i + 1],
                test: response[i + 2] // Add this line
              });
            }
            console.log(combinedResults)
            return combinedResults;
            
          })
        );
      })
    );
  }

  getAllTests(): Observable<Test[]> {
    const url = `${this.url}/tests/`;
    return this.http.get<Test[]>(url);
  }

}
