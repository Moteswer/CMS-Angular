import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../tables/login.service';
import { LoginAuthenticateService } from '../login/loginauthenticate.service';
import { Doctor } from '../tables/doctor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router, private loginAuthenticateService: LoginAuthenticateService) { }

  error: string = '';
  email: string;
  password: string;
  message: string;

  login() {
    this.loginService.login(this.email, this.password).subscribe(
      (response: any) => {
        console.log(response);
        if (response && response.message === 'Login successful') {
          this.message = response.message;
          if (response.staff_details && response.staff_details.staff_id) {
            // Store the staff_id for further use
            const staffId = response.staff_details.staff_id;
            // Call a method to store the staffId in your service or wherever you want
            this.storeStaffId(staffId);
          } else {
            console.error('Staff ID not found in response.');
            // Handle this case appropriately, such as displaying an error messag
          }

          if (response.specialization_details && response.specialization_details.id) {
            // Store the doctor_id for further use
            const doctorId = response.specialization_details.id;
            // Call a method to store the doctorId in your service or wherever you want
            this.storeDoctorId(doctorId);
          } else {
            console.error('Doctor ID not found in response.');
            // Handle this case appropriately, such as displaying an error messag
          }

          if (response.specialization_details) {
            const specializationId = response.specialization_details.id;
            // Fetch doctors by specialization ID
            this.loginService.getDoctorsBySpecializationId(specializationId).subscribe(
              (doctors: any) => {
                // Handle fetched doctors here
                console.log('Fetched doctors:', doctors);
                // Navigate to doctor dashboard based on specialization
                if (specializationId === 1) {
                  console.log('Navigating to neurologist');
                  this.router.navigate(['neurologist'], { queryParams: { id: this.email } });
                } else if (specializationId === 2) {
                  console.log('Navigating to cardiologist');
                  this.router.navigate(['cardiologist'], { queryParams: { id: this.email } });
                } else if (specializationId === 3) {
                  console.log('Navigating to pediatrician');
                  this.router.navigate(['pediatrician'], { queryParams: { id: this.email } });
                } else {
                  console.log('Unknown specialization ID:', specializationId);
                  // Handle other specializations if needed
                }
              },
              error => {
                console.error('Error fetching doctors:', error);
              }
            );
          } else if (response.role_details) {
            const { role_id } = response.role_details;
            // Handle other roles by role_id
            if (role_id === 1) { // Admin
              this.loginAuthenticateService.setAuthenticated(true);
              // Navigate to admin dashboard
              this.router.navigate(['admin']);
            } else if (role_id === 2) { // Receptionist
              // Navigate to receptionist dashboard
              this.router.navigate(['receptionist']);
            } else if (role_id === 4){
              this.router.navigate(['pharmacist']);
            }
            else if (role_id === 5){
              this.router.navigate(['lab-technician']);
            }
          } else {
            this.error = "Role details not found in the response.";
          }
        } else {
          this.error = response.error || "Invalid response from the server";
        }
      },
      (error: any) => {
        console.log(error);
        this.error = "Invalid Username or Password";
      }
    );
  }


  storeStaffId(staffId: number) {
    // Store the staffId in your service or wherever you want
    this.loginService.setStaffId(staffId);
  }
  storeDoctorId(doctorID: number) {
    // Store the staffId in your service or wherever you want
    this.loginService.setDoctorId(doctorID);
  }
} 