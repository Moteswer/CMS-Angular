import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/tables/appointment.service';
import { DoctorService } from 'src/app/tables/doctor.service';
import { LoginService } from 'src/app/tables/login.service';
import { PatientService } from 'src/app/tables/patient.service';

@Component({
  selector: 'app-cardiologist',
  templateUrl: './cardiologist.component.html',
  styleUrls: ['./cardiologist.component.scss']
})
export class CardiologistComponent implements OnInit {

  showProfilePopup: boolean = false;
  existingPassword: string = '';
  confirmPassword: string = '';
  isChangingPassword: boolean = false;
  newPassword: string = '';
  doctorId: number;
  appointments: any[]; 
  showAppointmentPopupFlag: boolean = false;

  constructor(private router:Router,private route: ActivatedRoute,
    private doctorService: DoctorService,
    private loginService:LoginService,
    private appointmentService: AppointmentService,
    private patientService:PatientService) { }

  ngOnInit(): void {
    

    


    this.route.queryParams.subscribe(params => {
      const doctorEmail = params['id'];
      this.getDoctorId(doctorEmail);
    });


    
  }

  

  getDoctorId(email: string): void {
    this.doctorService.getDoctorIdByEmail(email).subscribe(
      (response: any) => {
        if (response && response.doctorId) {
          this.doctorId = response.doctorId;
          console.log(this.doctorId)
          this.getAppointmentsByDoctorId(this.doctorId);
          
        } else {
          console.error('Doctor ID not found for email:', email);
          // Handle this case appropriately, such as displaying an error message
        }
      },
      error => {
        console.error('Error retrieving doctor ID:', error);
        // Handle this case appropriately, such as displaying an error message
      }
    );
  }

  getAppointmentsByDoctorId(doctorId: number): void {
    this.appointmentService.getAppointmentsByDoctorId(doctorId).subscribe(
      (response: any[]) => {
        this.appointments = response;
        console.log(this.appointments)
        this.fetchPatientDetailsForAppointments();
        // Handle the retrieved appointments as needed
      },
      error => {
        console.error('Error retrieving appointments:', error);
        // Handle this case appropriately, such as displaying an error message
      }
    );
  }

  fetchPatientDetailsForAppointments(): void {
    for (const appointment of this.appointments) {
      const patientId = appointment.patient; // Assuming patientId is the property containing the patient ID
      if (patientId) {
        this.patientService.getPatientDetails(patientId).subscribe(
          (patient: any) => {
            appointment.patient = patient;
          },
          error => {
            console.error('Error retrieving patient details:', error);
            // Handle this case appropriately, such as displaying an error message
          }
        );
      } else {
        console.error('Patient ID is undefined for appointment:', appointment);
        // Handle this case appropriately, such as displaying an error message
      }
    }
  }
  

  logout() {
    // Implement logout logic here
    // For example, redirect to logout page or clear session
    console.log('User logged out');
    this.router.navigate(['login']);
    // Optionally, you can also close the profile pop-up after logging out
    this.showProfilePopup = false;
  }

  

  showAppointmentPopup() {
    this.showAppointmentPopupFlag = true;
  }

  isCurrentDate(dateString: string): boolean {
    const currentDate = new Date();
    const appointmentDate = new Date(dateString);
    return currentDate.toDateString() === appointmentDate.toDateString();
}
toggleProfilePopup() {
  this.showProfilePopup = !this.showProfilePopup;
}

togglePasswordChange() {
  this.isChangingPassword = !this.isChangingPassword;
  this.existingPassword = ''; // Clear existing password field when toggling
  this.newPassword = ''; // Clear new password field when toggling
}

changePassword() {
  // Implement change password logic here
  // For example, show a success message or send a request to change password

  console.log('Password changed successfully');
  // Optionally, you can also close the profile pop-up after changing the password
  this.showProfilePopup = false;
}

submitPasswordChange(): void {
  // Check if new password and confirm password match
  if (this.newPassword !== this.confirmPassword) {
    console.error('Passwords do not match');
    // Optionally, display an error message to the user
    return;
  }

  // Retrieve the staff ID from the service or wherever you store it
  const doctorId = this.loginService.getDoctorId();
  if (!doctorId) {
    console.error('Staff ID not found');
    // Optionally, display an error message to the user
    return;
  }

  // Call the service method to update the password
  this.doctorService.updatePassword(doctorId, this.newPassword).subscribe(
    (response: any) => {
      console.log('Password updated successfully:', response);
      alert('Password changed successfully,Please Log in again!')
      this.router.navigate(['login']);
      // Optionaly, display a success message to the user
    },
    error => {
      console.error('Error updating password:', error);
      // Optionally, display an error message to the user
    }
  );
}

navigateToDiagnosis(doctorId:string, patientId: string, appointmentId: string) {
  // Navigate to the diagnosis component
  this.router.navigate(['/diagnosis',{ doctorId:this.doctorId, patientId, appointmentId }]);
}


 

}
