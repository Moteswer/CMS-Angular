import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaffsService } from 'src/app/tables/staffs.service';
import { LoginService } from 'src/app/tables/login.service';
import { PatientService } from 'src/app/tables/patient.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showProfilePopup: boolean = false;
  isChangingPassword: boolean = false;
  existingPassword: string = '';
  newPassword: string = '';
  staffId: number;
  confirmPassword: string = '';
  showAppointmentPopupFlag: boolean = false;
  patientPhoneNumber: string;




  constructor(private router: Router,private staffsService:StaffsService,private loginService: LoginService,private patientService:PatientService) { }

  ngOnInit(): void {


    
  }

  navigateToAddPatientForm() {
    this.router.navigate(['add-patient']);
  }

  navigateToPatientList() {
    this.router.navigate(['list-patients']);
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
    const staffId = this.loginService.getStaffId();
    if (!staffId) {
        console.error('Staff ID not found');
        // Optionally, display an error message to the user
        return;
    }

    // Call the service method to update the password
    this.staffsService.updatePassword(staffId, this.newPassword).subscribe(
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

showAppointmentPopup() {
  this.showAppointmentPopupFlag = true;
}

checkPatientAndBookAppointment() {
  if (!this.patientPhoneNumber) {
    // Handle case where phone number is not provided
    return;
  }

  // Call service to check if phone number exists in patient table
  this.patientService.checkPhoneNumberExistsInPatientTable(this.patientPhoneNumber)
    .subscribe(exists => {
      if (exists) {
        // Phone number exists, navigate to booking form
        this.router.navigate(['book-appointment', this.patientPhoneNumber]);
      } else {
        // Phone number does not exist, show message
        alert('Patient does not exist. Please register as a new patient.');
        this.router.navigate(['add-patient'])
      }
    });
}





  

  logout() {
    // Implement logout logic here
    // For example, redirect to logout page or clear session
    console.log('User logged out');
    this.router.navigate(['login']);
    // Optionally, you can also close the profile pop-up after logging out
    this.showProfilePopup = false;
  }

}