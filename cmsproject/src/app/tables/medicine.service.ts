import { Injectable } from '@angular/core';
import { Observable,forkJoin,throwError } from 'rxjs';
import { Medicine } from './medicine';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private url = 'http://127.0.0.1:8000';
 

  constructor(private http:HttpClient) { }

  getMedicines(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${this.url}/medicines/`);
  }

  addMedicine(newMedicine: Medicine): Observable<Medicine> {
    return this.http.post<Medicine>(`${this.url}/medicines/`, newMedicine);
  }

  updateMedicine(medicineId: number, updatedData: any): Observable<any> {
    const url = `${this.url}/medicines/${medicineId}/`; // Assuming your API supports updating medicine by ID
    return this.http.put<any>(url, updatedData);
  }

  updatePatientIsActive(medicineId: number, isActive: boolean): Observable<any> {
    const url = `${this.url}/medicine/${medicineId}/isActive`;
    return this.http.put(url, { is_active: isActive }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }

  checkMedicineExists(medicineName: string): Observable<any> {
    return this.http.get<any>(`${this.url}/api/check-medicine/?medicine_name=${medicineName}`);
  }

  checkMedicinesFromList(diagnosisList: any[]): Observable<boolean[]> {
    const requests: Observable<boolean>[] = [];
    for (const diagnosis of diagnosisList) {
      const medicineName = diagnosis.diagnosis.medicine;
      const request = this.checkMedicineExists(medicineName);
      requests.push(request);
    }
    return forkJoin(requests);
  }

  checkMedicineExistsByName(medicineName: string): Observable<boolean> {
    const apiUrl = `${this.url}/api/check-medicine/${medicineName}`;
    return this.http.get<boolean>(apiUrl);
  }

  getMedicineIdByName(medicineName: string): Observable<number> {
    return this.http.get<number>(`${this.url}/api/get-medicine-id-by-name/${medicineName}/`);
  }

  checkMedicineExistsById(medicineId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/api/check-medicine-exists-by-id/${medicineId.toString()}`);
  }

}
