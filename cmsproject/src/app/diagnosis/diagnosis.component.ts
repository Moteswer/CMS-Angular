import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../tables/appointment.service';
import { PatientService } from '../tables/patient.service';
import { DiagnosisService } from '../diagnosis/diagnosis.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {

  doctorId: number;
  appointmentId: number;
  patientId: number;
  appointmentDetails: any;
  patientDetails: any;
  diagnosis:string='';
  symptoms:string='';
  medicine:string='';
  dosage:string='';
  doctor:string='';
  test:string='';
  appointment:string='';
  patient:string='';

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private diagnosisService: DiagnosisService,
    private location:Location,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.appointmentId = +params['appointmentId']; // Convert to number using '+'
      this.patientId = +params['patientId'];
      this.route.params.subscribe(params => {
        this.doctorId = parseInt(params['doctorId'], 10);
        this.patientId = parseInt(params['patientId'], 10);
        this.appointmentId = parseInt(params['appointmentId'], 10);
      }); // Convert to number using '+'
      // Fetch appointment and patient details based on IDs
      this.fetchAppointmentDetails(this.appointmentId);
      this.fetchPatientDetails(this.patientId);
    });
  }


  fetchAppointmentDetails(appointmentId: number): void {
    this.appointmentService.getAppointmentById(appointmentId).subscribe(
      (data) => {
        this.appointmentDetails = data;
        console.log(this.appointmentDetails)
      },
      (error) => {
        console.error('Error fetching appointment details:', error);
      }
    );
  }

  fetchPatientDetails(patientId: number): void {
    this.patientService.getPatientDetails(patientId).subscribe(
      (data) => {
        this.patientDetails = data;
        console.log(this.patientDetails)
      },
      (error) => {
        console.error('Error fetching patient details:', error);
      }
    );
  }

  saveDiagnosis() {
    // Create an object with diagnosis data
    const diagnosisData = {
      doctor: this.doctorId,
      patient: this.patientId,
      appointment: this.appointmentId,
      diagnosis: this.diagnosis,
      symptoms: this.symptoms,
      medicine: this.medicine,
      dosage: this.dosage,
      test:this.test
    };

    // Call the service function to post diagnosis data
    this.diagnosisService.postDiagnosisData(diagnosisData).subscribe(response => {
      alert('Diagnosis Successfull')
      this.location.back();
      // Handle response if needed
    });

    // Optionally, you can clear the form fields after saving
    this.clearForm();
  }

  clearForm() {
    // Clear form fields
    this.diagnosis = '';
    this.symptoms = '';
    this.medicine = '';
    this.dosage = '';
    this.test='';
  }
}

