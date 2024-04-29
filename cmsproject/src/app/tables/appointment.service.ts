import { Injectable } from '@angular/core';
import { Appointment } from './appointment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Patient } from './patient';
import { Doctor } from './doctor';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http:HttpClient) { }


  book1Appointment(appointment: Appointment): Observable<any> {
    const url = `${this.apiUrl}/appointments`;
    return this.http.post<any>(url, appointment);
  }

  bookAppointment(doctorId: number, patientId: number, selectedDateTime: string): Observable<any> {
    const tokenNo = this.generateToken(); // Generate token
    const appointmentData = {
      doctor: doctorId,
      patient: patientId,
      booking_date: selectedDateTime, // Assuming selectedDateTime contains both date and time
      token_no: tokenNo // Assign generated token
    };
    return this.http.post<any>('http://127.0.0.1:8000/appointments/', appointmentData);
  }
  

  private generateToken(): string {
    // Generate a random 10-character alphanumeric token
    const characters = 'PP6789';
    let token = '';
    for (let i = 0; i < 5; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }

  getAppointmentsByDoctorId(doctorId: number): Observable<Appointment[]> {
    const url = `${this.apiUrl}/appointments/by-doctor/${doctorId}/`;
    return this.http.get<Appointment[]>(url);
  }

  getAppointmentsByPatientId(patientId: number): Observable<Appointment[]> {
    const url = `${this.apiUrl}/api/appointments/by-patient/${patientId}`;
    return this.http.get<Appointment[]>(url);
  }
  getAppointmentById(appointmentId: number): Observable<Appointment> {
    const url = `${this.apiUrl}/appointments/${appointmentId}`;
    return this.http.get<Appointment>(url);
  }
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/`);
  }

  getPatientById(patientId: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patients/${patientId}/`);
  }

  getDoctorById(doctorId: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/doctors/${doctorId}/`);
  }


}
