import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Appointment } from 'src/app/tables/appointment';
import { AppointmentService } from 'src/app/tables/appointment.service';
import { Doctor } from 'src/app/tables/doctor';
import { DoctorService } from 'src/app/tables/doctor.service';
import { Patient } from 'src/app/tables/patient';
import { Test } from 'src/app/tables/test';
import { TestService } from 'src/app/tables/test.service';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {


  patient: Patient;
  tests: Test[];
  doctors: Doctor[];
  appointments: Appointment[];
  totalPrice: number;

  constructor(private route: ActivatedRoute, private testService: TestService, private doctorService: DoctorService, private appointmentService: AppointmentService) { }



  ngOnInit(): void {
    this.patient = history.state.patient;
    const patientId = this.patient.patient_id;
    
    // Fetch appointment details using the patient's ID
    this.appointmentService.getAppointmentsByPatientId(patientId).subscribe(
      (appointments) => {
        this.appointments = appointments;
        console.log(appointments)

        // Extract doctor IDs from appointments
        const doctorIds = appointments.map(appointment => appointment.doctor);

        // Fetch doctor details for each doctor ID
        const doctorRequests = doctorIds.map(doctorId => this.doctorService.getDoctorById(doctorId));

        // Combine multiple HTTP requests into a single observable
        forkJoin(doctorRequests).subscribe(
          (doctors) => {
            this.doctors = doctors;
            console.log('doctor',doctors)
          },
          error => {
            console.error('Error fetching doctor details:', error);
          }
        );
      },
      error => {
        console.error('Error fetching appointment details:', error);
      }
    );


    // Fetch tests
    this.testService.getAllTests().subscribe(
      (tests) => {
        this.tests = tests;
      },
      error => {
        console.error('Error fetching tests:', error);
      }
    );
    this.fetchAvailableDoctors();
  }

  fetchAvailableDoctors(): void {
    this.doctorService.getDoctors().subscribe((doctors: Doctor[]) => {
      this.doctors = doctors;
    });

  }

  printBill(): void {
    // Logic to print the bill
    window.print();
}
  

}  
