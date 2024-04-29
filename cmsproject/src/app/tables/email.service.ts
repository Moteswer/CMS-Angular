import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = 'http://localhost:8000'; // Change the port accordingly

  constructor(private http: HttpClient) { }

  getEmails(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/get-emails/`);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/api/check-email/`, { email });
  }
  

  
}