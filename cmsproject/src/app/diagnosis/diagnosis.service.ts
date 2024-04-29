import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {
  getDiagnosis() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8000';

  constructor(private http:HttpClient) { }

  postDiagnosisData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/diagnosis/`, data);
  }
}
