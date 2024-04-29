import { Component, OnInit } from '@angular/core';
import { StaffsService } from '../tables/staffs.service';
import { RolesService } from '../tables/role.service';
import { Staffs } from '../tables/staffs';
import { Role } from '../tables/role';
import { EmailService } from '../tables/email.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {
  staff: Staffs = new Staffs();
  roles: Role[] = [];
  confirmPassword:string;
  emails: string[] = [];
  enteredEmail: string = '';
  emailExistsError: string = '';
  enteredPhoneNumber:string = '';
  phoneNumberExistsError: string = '';
  first_name: '';
  last_name: '';
  staffForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private rolesService: RolesService,private staffsService: StaffsService,private emailService:EmailService) { }


  

  ngOnInit(): void {
  
    this.loadRoles();
    this.getEmails();
      

    this.staffForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator]]
    });
    
  }
   

  
  
  noWhitespaceValidator(control) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }


  get f() {
    return this.staffForm.get('password');
  }
  


  
  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0]; // Format currentDate as "yyyy-MM-dd"
  }

 
  isValidPhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  }

  isValidDateOfBirth(dateOfBirth: string): boolean {
    const selectedDate = new Date(dateOfBirth);
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    return selectedDate <= maxDate;
  }

  isValidName(name: string): boolean {
    return /^[a-zA-Z]+$/.test(name.trim());
  }


  getMaxDateOfBirth(): string {
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    return maxDate.toISOString().split('T')[0]; // Format maxDate as "yyyy-MM-dd"
  }


  addStaff() {

    this.staff.phone_number = parseInt(this.enteredPhoneNumber, 10);


    this.staff.email = this.enteredEmail
    this.staff.first_name = this.first_name
    this.staff.last_name = this.last_name

    this.staffsService.addStaff(this.staff).subscribe(
      data => {
        // Optionally, you can handle success response here
        window.alert('Staff added successfully:')
        console.log('Staff added successfully:', data);

        window.location.reload();
        
        // Clear the form fields
        this.staff = new Staffs();
       
        // Assuming you want to clear confirmPassword field as well
      },
      error => {
        console.error('Error adding staff:', error);
        // Optionally, you can handle error response here
        
        // Clear the form fields
        this.staff = new Staffs();
        this.confirmPassword = ''; // Assuming you want to clear confirmPassword field as well
      }
    );
  }


  

  loadRoles(): void {
    this.rolesService.getRoles().subscribe(
      roles => {
        // Filter roles to include only the roles with role IDs 2, 4, 5
        this.roles = roles.filter(role => [2, 4, 5].includes(role.role_id));
      }, 
      error => {
        console.error('Error loading roles:', error);
        // Handle error loading roles if necessary
      }
    );
  }

  getEmails(): void {
    this.emailService.getEmails().subscribe(
      emails => {
        this.emails = emails;
        console.log('Emails:', this.emails); // Log the fetched emails to verify
      },
      error => {
        console.error('Error fetching emails:', error);
      }
    );
  }


  checkEmailExists(): void {
    // Check if entered email is not empty and matches email format
    if (this.enteredEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.enteredEmail)) {
      // Call the function to check if email exists in staff table
      this.staffsService.checkEmailExistsInStaffTable(this.enteredEmail).subscribe(
        exists => {
          // Check if the entered email exists in the staff table
          if (exists) {
            // If it exists, set the error message
            this.emailExistsError = 'Email already exists in staff table';
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
        this.staffsService.checkPhoneNumberExistsInStaffTable(this.enteredPhoneNumber).subscribe(
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