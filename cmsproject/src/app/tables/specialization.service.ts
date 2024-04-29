import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialization } from './specialization';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  private apiUrl = 'http://localhost:8000'; // Update this with your API URL

  constructor(private httpClient: HttpClient) { }

  getSpecializations(): Observable<Specialization[]> {
    return this.httpClient.get<Specialization[]>(`${this.apiUrl}/specializations/`);
  }
}
