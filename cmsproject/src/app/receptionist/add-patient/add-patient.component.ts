import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/tables/patient';
import { PatientService } from 'src/app/tables/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  patient: Patient = new Patient();
  confirmPassword:string;
  emails: string[] = [];
  enteredEmail: string = '';
  emailExistsError: string = '';
  enteredPhoneNumber:string = '';
  phoneNumberExistsError: string = '';
  first_name: '';
  last_name: '';
  blood_group: string = '';

  constructor(private formBuilder: FormBuilder,private patientService: PatientService,private router:Router) { }


  

  ngOnInit(): void {
  }
   
  



  
  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0]; // Format currentDate as "yyyy-MM-dd"
  }

  getMaxDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adjust month to ensure two digits
    const day = currentDate.getDate().toString().padStart(2, '0'); // Adjust day to ensure two digits
    return `${year}-${month}-${day}`;
}


 
  isValidPhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  }

  isValidDateOfBirth(dateOfBirth: string): boolean {
    const selectedDate = new Date(dateOfBirth);
    const currentDate = new Date();
    return selectedDate <= currentDate;
}

  getMaxDateOfBirth(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0]; // Format currentDate as "yyyy-MM-dd"
}


  isValidName(name: string): boolean {
    return /^[a-zA-Z]+$/.test(name.trim());
  }


  addPatient() {
    this.patient.phone_number = parseInt(this.enteredPhoneNumber, 10);
    this.patient.email = this.enteredEmail;
    this.patient.first_name = this.first_name;
    this.patient.last_name = this.last_name;
  
    this.patientService.addPatient(this.patient).subscribe(
      (data) => {
        // Extract the patient ID from the response
        const patientId = data.patient_id;
        console.log('Patient ID:', patientId);
  
        // Navigate to the book appointment page with the patient ID as a route parameter
        
  
        // Optionally, you can handle success response here
        window.alert('Patient Details added successfully:');
        console.log('Patient Details added successfully:', data);
        this.router.navigate(['new-bookappointment', patientId]);
  
        // Clear the form fields
        this.patient = new Patient();
      },
      (error) => {
        console.error('Error adding Patient Details:', error);
        // Optionally, you can handle error response here
  
        // Clear the form fields
        this.patient = new Patient();
        this.confirmPassword = ''; // Assuming you want to clear confirmPassword field as well
      }
    );
  }


  

  // getEmails(): void {
  //   this.emailService.getEmails().subscribe(
  //     emails => {
  //       this.emails = emails;
  //       console.log('Emails:', this.emails); // Log the fetched emails to verify
  //     },
  //     error => {
  //       console.error('Error fetching emails:', error);
  //     }
  //   );
  // }


  checkEmailExists(): void {
    // Check if entered email is not empty and matches email format
    if (this.enteredEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.enteredEmail)) {
      // Call the function to check if email exists in staff table
      this.patientService.checkEmailExistsInPatientTable(this.enteredEmail).subscribe(
        exists => {
          // Check if the entered email exists in the staff table
          if (exists) {
            // If it exists, set the error message
            this.emailExistsError = 'Email already exists in Doctor table';
          } else {
            // If it doesn't exist, clear the error message
            this.emailExistsError = '';
          }
        },
        error => {
          // Handle error from the server
          console.error('Error checking email:', error);
          // You may want to display an error message or handle it differently
        }
      );
    } else {
      // If entered email is empty or doesn't match email format, show error message
      this.emailExistsError = 'Please enter a valid email address';
    }
}
  checkPhoneNumberExists(): void {
    // Check if entered phone number is not empty
    if (this.enteredPhoneNumber && this.enteredPhoneNumber.trim() !== '') {
      // Validate phone number format
      const phoneRegex = /^[0-9]{10}$/;
      if (phoneRegex.test(this.enteredPhoneNumber)) {
        // If phone number format is valid, make the API call to check existence
        this.patientService.checkPhoneNumberExistsInPatientTable(this.enteredPhoneNumber).subscribe(
          exists => {
            if (exists) {
              this.phoneNumberExistsError = 'Phone number already exists in staff table';
            } else {
              this.phoneNumberExistsError = '';
            }
          },
          error => {
            console.error('Error checking phone number:', error);
          }
        );
      } else {
        // If phone number format is invalid, set error message
        this.phoneNumberExistsError = 'Invalid phone number format (should be 10 digits)';
      }
    } else {
      // Clear error if entered phone number is empty
      this.phoneNumberExistsError = '';
    }
  }
  
}
