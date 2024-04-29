import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Staffs } from '../tables/staffs';

@Injectable({
  providedIn: 'root'
})
export class StaffsService {
  private apiUrl = 'http://localhost:8000';
  private url = 'http://127.0.0.1:8000';

  constructor(private httpClient: HttpClient,private http: HttpClient) { }

  getStaffs(): Observable<Staffs[]> {
    return this.httpClient.get<Staffs[]>(`${this.apiUrl}/staffs/`);
  }

  addStaff(staff: Staffs): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/staffs/`, staff);
  }

  checkEmailExistsInStaffTable(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/api/check-email`, { params: { email } });
  }

  checkPhoneNumberExistsInStaffTable(phone_number: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/api/check-phone-number`, { params: { phone_number } });
  }

  updateStaff(staff_id: number, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}/staffs/${staff_id}/`;
    return this.http.put(url, updatedData);
  }

  updateStaffIsActve(staffId: number, isActive: boolean): Observable<any> {
    const url = `${this.url}/staffs/${staffId}/toggle-active/`;
    return this.http.put(url, { is_active: isActive }).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling function
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }
  
  updatePassword(staffId: number, newPassword: string): Observable<any> {
    const url = `${this.apiUrl}/api/update-password/${staffId}/`;
    return this.http.put(url, { new_password: newPassword });
  }
}



