import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/tables/patient';
import { PatientService } from 'src/app/tables/patient.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  patients: Patient[];

  constructor(private patientService:PatientService,private router:Router) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe(
      (patients: Patient[]) => {
        this.patients = patients;
      },
      (error) => {
        console.error('Error fetching staffs:', error);
      }
    );
  }

  navigatereport(patient: Patient): void {
    // Navigate to the next page and pass patient details
    this.router.navigate(['report-page'], { state: { patient: patient, patientId: patient.patient_id } });
  }
  



}
