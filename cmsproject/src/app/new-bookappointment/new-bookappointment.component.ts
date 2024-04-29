import { Component, OnInit } from '@angular/core';
import { Doctor } from '../tables/doctor';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../tables/doctor.service';
import { AppointmentService } from '../tables/appointment.service';
import { PatientService } from '../tables/patient.service';
import { Patient } from '../tables/patient';

@Component({
  selector: 'app-new-bookappointment',
  templateUrl: './new-bookappointment.component.html',
  styleUrls: ['./new-bookappointment.component.scss']
})
export class NewBookappointmentComponent implements OnInit {
  patientId: number;
  doctors: Doctor[];
  selectedDoctorId: number;
  selectedDateTime: string;
  showAppointmentPopup: boolean = false;
  patient: Patient;

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private patientService:PatientService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const patientId = this.route.snapshot.params['patientId']; // Get the patient ID from the route parameter
    this.patientService.getPatientDetails(patientId).subscribe(
      (patient: Patient) => {
        this.patient = patient; // Assign the fetched patient details to the component variable
      },
      (error) => {
        console.error('Error fetching patient details:', error);
      }
    );
    this.fetchAvailableDoctors();
  }

  fetchAvailableDoctors(): void {
    this.doctorService.getDoctors().subscribe((doctors: Doctor[]) => {
      this.doctors = doctors;
    });
  }

  selectDoctor(doctorId: number, patientId: number) {
    this.selectedDoctorId = doctorId;
    this.patientId = patientId;
    console.log(patientId, doctorId)
    this.showAppointmentPopup = true; // Set flag to show the pop-up for selecting date and time
  }

  closePopup() {
    this.showAppointmentPopup = false;
  }

  bookAppointment() {
    // Assuming you have a service named appointmentService with a method for booking appointments
    this.appointmentService.bookAppointment(this.selectedDoctorId, this.patientId, this.selectedDateTime)
      .subscribe(
        (response) => {
          // Handle successful appointment booking
          console.log('Appointment booked successfully:', response);
          // Reset selected doctor ID and selected date time
          this.selectedDoctorId = null;
          this.selectedDateTime = null;
          // Close the pop-up
          this.showAppointmentPopup = false;
          window.alert('Appointment booked successfully');
          this.navigateToBill(this.patientId);
        },
        (error) => {
          // Handle error
          console.error('Error booking appointment:', error);
          // Optionally, display an error message to the user
        }
      );
  }

  navigateToBill(patientId: number) {
    // Navigate to the bill component and pass the patient ID as a route parameter
    this.router.navigate(['bill', patientId]);
  }
}
