import { Component, OnInit } from '@angular/core';
import { Appointment } from '../tables/appointment';
import { Patient } from '../tables/patient';
import { Doctor } from '../tables/doctor';
import { AppointmentService } from '../tables/appointment.service';
import { PatientService } from '../tables/patient.service';
import { DoctorService } from '../tables/doctor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  patient: Patient;
  appointments: Appointment[];
  doctors: { [key: number]: Doctor } = {}; // Dictionary to store doctor details

  constructor(private route: ActivatedRoute,
              private patientsService: PatientService,
              private appointmentService: AppointmentService,
              private doctorService: DoctorService) { }

  ngOnInit(): void {
    // Get the patient ID from the route parameters
    this.route.params.subscribe(params => {
      const patientId = +params['patientId']; // '+' is to convert string to number
      // Call service methods to fetch patient and appointment details
      this.getPatientDetails(patientId);
      this.getAppointmentDetails(patientId);
    });
  }

  getPatientDetails(patientId: number) {
    this.patientsService.getPatientDetails(patientId).subscribe(
      (patient: Patient) => {
        this.patient = patient;
      },
      (error) => {
        console.error('Error fetching patient details:', error);
        // Optionally, handle error
      }
    );
  }

  getAppointmentDetails(patientId: number) {
    this.appointmentService.getAppointmentsByPatientId(patientId).subscribe(
      (appointments: Appointment[]) => {
        this.appointments = appointments;
        // Fetch doctor details for each appointment
        appointments.forEach(appointment => {
          this.doctorService.getDoctorById(appointment.doctor).subscribe(
            (doctor: Doctor) => {
              this.doctors[appointment.appointment_id] = doctor;
            },
            (error) => {
              console.error('Error fetching doctor details:', error);
              // Optionally, handle error
            }
          );
        });
      },
      (error) => {
        console.error('Error fetching appointment details:', error);
        // Optionally, handle error
      }
    );
  }
  calculateTotal(appointments: Appointment[]): number {
    let total: number = 0; // Initialize total as a number
    const gstRate = 0.15; // 15% GST rate
  
    appointments.forEach(appointment => {
      const doctor = this.doctors[appointment.appointment_id];
      if (doctor && doctor.consultation_fee) {
        total += Number(doctor.consultation_fee); // Convert consultation_fee to number
      }
    });
  
    // Calculate GST amount
    const gstAmount = total * gstRate;
  
    // Add GST to total
    total += gstAmount;
  
    return total;
  }
  

  printBill(): void {
    // Open the print dialog for the current page
    window.print();
  }
  
  
  
}
