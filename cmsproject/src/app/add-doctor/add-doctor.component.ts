import { Component, OnInit } from '@angular/core';
import { SpecializationService } from '../tables/specialization.service';
import { DoctorService } from '../tables/doctor.service';
import { Doctor } from '../tables/doctor';
import { Specialization } from '../tables/specialization';
import { EmailService } from '../tables/email.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {
  doctor: Doctor = new Doctor();
  specializations: Specialization[] = [];
  selectedSpecialization: number;
  confirmPassword: string;
  emails: string[] = [];
  enteredEmail_doc: string = '';
  emailExistsError: string = '';
  
  phoneNumberExistsError: string = '';
  first_name: string = '';
  last_name: string = '';
  enteredPhoneNumber_doc: string = '';
  timeOptions: string[] = [
    '9 A.M - 12 P.M',
    '1 P.M - 3 P.M',
    '4 P.M - 6 P.M',
    '6 P.M - 8 P.M'
  
  ];

  constructor(private formBuilder: FormBuilder, private specializationService: SpecializationService, private doctorsService: DoctorService, private emailService: EmailService) { }

  ngOnInit(): void {
    this.loadSpecializations();
  }

  loadSpecializations(): void {
    this.specializationService.getSpecializations().subscribe(
      specializations => {
        this.specializations = specializations;
      },
      error => {
        console.error('Error loading specializations:', error);
      }
    );
  }


  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adjust month to ensure two digits
    const day = currentDate.getDate().toString().padStart(2, '0'); // Adjust day to ensure two digits
    return `${year}-${month}-${day}`;
}


  isValidDateOfBirth(dateOfBirth: string): boolean {
    const selectedDate = new Date(dateOfBirth);
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear() - 25, currentDate.getMonth(), currentDate.getDate());
    return selectedDate <= maxDate;
  }

  isValidName(name: string): boolean {
    return /^[a-zA-Z]+$/.test(name.trim());
  }

  isValidConsultationFee(): boolean {
    // Check if the consultation_fee is a valid number and less than or equal to 9999
    const consultationFee = this.doctor.consultation_fee;
    return /^[0-9]+$/.test(consultationFee) && parseInt(consultationFee, 10) <= 9999;
}



  getMaxDateOfBirth(): string {
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear() - 25, currentDate.getMonth(), currentDate.getDate());
    return maxDate.toISOString().split('T')[0]; // Format maxDate as "yyyy-MM-dd"
  }


  addDoctor() {
    
    this.doctor.phone_number = parseInt(this.enteredPhoneNumber_doc, 10);
    
    this.doctor.email = this.enteredEmail_doc// Convert string to number


    this.doctorsService.addDoctor(this.doctor).subscribe(
      data => {
        // Optionally, you can handle success response here
        window.alert('Doctor added successfully:')
        console.log('Doctor added successfully:', data);

        window.location.reload();

        // Clear the form fields
        this.doctor = new Doctor();
       
         // Assuming you want to clear confirmPassword field as well
      },
      error => {
        console.error('Error adding staff:', error);
        // Optionally, you can handle error response here

        // Clear the form fields
        this.doctor = new Doctor();
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


  checkEmailExists_doc(): void {
    // Check if entered email is not empty and matches email format
    if (this.enteredEmail_doc && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.enteredEmail_doc)) {
      // Call the function to check if email exists in staff table
      this.doctorsService.checkEmailExistsInDoctorTable(this.enteredEmail_doc).subscribe(
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
  checkPhoneNumberExists_doc(): void {
    // Check if entered phone number is not empty
    if (this.enteredPhoneNumber_doc && this.enteredPhoneNumber_doc.trim() !== '') {
      // Validate phone number format
      const phoneRegex = /^[0-9]{10}$/;
      if (phoneRegex.test(this.enteredPhoneNumber_doc)) {
        // If phone number format is valid, make the API call to check existence
        this.doctorsService.checkPhoneNumberExistsInDoctorTable(this.enteredPhoneNumber_doc).subscribe(
          exists => {
            if (exists) {
              this.phoneNumberExistsError = 'Phone number already exists in doctor table';
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