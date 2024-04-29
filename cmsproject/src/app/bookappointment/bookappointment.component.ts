import { Component, OnInit } from '@angular/core';
import { PatientService } from '../tables/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../tables/doctor.service';
import { Doctor } from '../tables/doctor';
import { AppointmentService } from '../tables/appointment.service';
import { Appointment } from '../tables/appointment';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.scss']
})
export class BookappointmentComponent implements OnInit {
  phoneNumber: string;
  patientDetails: any;
  doctors: Doctor[];
  selectedDoctor: Doctor;
  selectedDate: string;
  selectedDoctorId: number;
  patientId: number;
  showAppointmentPopup: boolean = false;
  dutyTime: string; // Duty time fetched from the service
  timeSlots: string[] = [];
  availableTimeSlots: string[] = [];



  constructor(private route: ActivatedRoute,private router:Router, private patientService: PatientService, private doctorService: DoctorService, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.phoneNumber = params.get('phoneNumber');
      this.fetchPatientDetails(this.phoneNumber);
    });
    this.fetchAvailableDoctors();
  }

  fetchPatientDetails(phoneNumber: string): void {
    this.patientService.fetchPatientDetails(phoneNumber).subscribe(
      (response: any) => {
        console.log('Patient details:', response);
        this.patientDetails = response;
      },
      (error: any) => {
        console.error('Error fetching patient details:', error);
      }
    );
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
    this.showAppointmentPopup = true;
    this.loadTimeSlots(doctorId); // Set flag to show the pop-up for selecting date and time
  }

  loadTimeSlots(doctorId: number) {
    if (!doctorId) {
      console.error("Doctor ID is not available.");
      return;
    }

    // Assuming you have a method to fetch the doctor details by ID
    this.doctorService.getDoctorById(doctorId).subscribe(
      (doctor: any) => {
        if (!doctor) {
          console.error("Doctor not found for ID:", doctorId);
          return;
        }

        // Calculate available time slots for the doctor
        this.calculateAvailableTimeSlots(doctor);

        // Show the appointment popup after loading time slots
        this.showAppointmentPopup = true;
      },
      (error) => {
        console.error("Error fetching doctor:", error);
        // Handle error
      }
    );
  }

  onDateChange() {
    if (this.selectedDate) {
      this.selectedDate = this.selectedDate; // Extract the date part
      this.availableTimeSlots = []; // Clear the available time slots
      this.loadTimeSlots(this.selectedDoctorId); // Load new time slots for the selected date
    }
  }







  calculateAvailableTimeSlots(doctor: any) {
    // Check if doctor object exists
    if (!doctor) {
      console.error("Doctor object not found.");
      return;
    }

    // Extract duty_time from the doctor object
    const dutyTime = doctor.Duty_time;

    // Check if dutyTime is a valid string
    if (typeof dutyTime !== 'string') {
      console.error("Invalid duty time:", dutyTime);
      return;
    }

    // Split the duty time into start and end times
    const timeParts = dutyTime.split(' - ');

    // Check if duty time is in correct format
    if (timeParts.length !== 2) {
      console.error("Invalid duty time format:", dutyTime);
      return;
    }

    // Convert AM/PM time format to 24-hour format
    const startTime24 = this.convertTo24HourFormat(timeParts[0]);
    const endTime24 = this.convertTo24HourFormat(timeParts[1]);

    // Extract hours from start and end times
    const startHour = parseInt(startTime24.substr(0, 2));
    const endHour = parseInt(endTime24.substr(0, 2));

    // Calculate available time slots
    this.availableTimeSlots = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        this.availableTimeSlots.push(time);
      }
    }

    // Display the calculated time slots in the console
    console.log("Available Time Slots:", this.availableTimeSlots);
  }



  convertTo24HourFormat(time: string): string {
    let [hourStr, minuteStr] = time.split(' ')[0].split(':');
    let hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);

    if (time.includes('PM') && hour < 12) {
      hour += 12;
    } else if (time.includes('AM') && hour === 12) {
      hour = 0;
    }

    return hour.toString().padStart(2, '0') + ':' + minuteStr;
  }




  closePopup() {
    this.showAppointmentPopup = false;
  }

  bookAppointment(selectedDateTime: string) {
    // Extract the time part from the selectedDateTime
    const selectedTime = selectedDateTime.split('T')[1];
    const selectedDate = selectedDateTime.split('T')[0];
  
    // Check if the selectedTime exists in the availableTimeSlots array
    if (!this.availableTimeSlots.includes(selectedTime)) {
      window.alert('Selected time slot is not available:');
      console.error('Selected time slot is not available:', selectedTime);
      // Optionally, display an error message to the user
      return;
    }
    this.onDateChange();
  
    // Check if the selected time slot is already booked
    this.appointmentService.getAppointmentsByDoctorId(this.selectedDoctorId).subscribe(
      (appointments: Appointment[]) => {
        // Filter appointments for the selected time slot and date
        const conflictingAppointments = appointments.filter(appointment => {
          // Extract the time part from the booking_date
          const bookingTime = appointment.booking_date.split('T')[1];
          const bookingDate = appointment.booking_date.split('T')[0];
  
          // Check if the booking time matches the selected time and date
          return bookingTime === selectedTime && bookingDate === selectedDate;
        });
  
        if (conflictingAppointments.length > 0) {
          window.alert('Selected time slot is already booked.');
          console.error('Selected time slot is already booked:', selectedDateTime);
          // Optionally, display an error message to the user
          return;
        }
  
        // Assuming you have a service named appointmentService with a method for booking appointments
        this.appointmentService.bookAppointment(this.selectedDoctorId, this.patientId, selectedDateTime)
          .subscribe(
            (response) => {
              // Handle successful appointment booking
              console.log('Appointment booked successfully:', response);
              // Reset selected doctor and patient IDs
              this.patientId = response.patient
              // Close the pop-up
              this.showAppointmentPopup = false;
              window.alert('Appointment booked successfully');
              // Navigate to the bill page with the patientId parameter
              this.navigateToBill(this.patientId);
            },
            (error) => {
              // Handle error
              console.error('Error booking appointment:', error);
              // Optionally, display an error message to the user
            }
          );
      },
      (error) => {
        console.error('Error fetching appointments:', error);
        // Optionally, handle error
      }
    );
  }

  navigateToBill(patientId: number) {
    // Navigate to the bill component and pass the patient ID as a route parameter
    this.router.navigate(['bill', patientId]);
  }
  

}
