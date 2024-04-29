import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../tables/login';
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private staffId: number;
  private doctorId: number;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Login> {
    // Replace '/api/login' with your actual login endpoint
    return this.http.post<Login>('http://localhost:8000/login/', { email, password });
  }

  setStaffId(staffId: number): void {
    this.staffId = staffId;
  }

  // Retrieve the stored staff_id
  getStaffId(): number {
    return this.staffId;
  }

  setDoctorId(doctorId: number): void {
    this.doctorId = doctorId;
  }

  // Retrieve the stored staff_id
  getDoctorId(): number {
    return this.doctorId;
  }

  getDoctorsBySpecializationId(specializationId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/specialization/${specializationId}/`);
  }
}

