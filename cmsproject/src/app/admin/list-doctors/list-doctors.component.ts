import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/tables/doctor';
import { DoctorService } from 'src/app/tables/doctor.service';

import { StaffsService } from 'src/app/tables/staffs.service';

@Component({
  selector: 'app-list-doctors',
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.scss']
})
export class ListDoctorsComponent implements OnInit {
  filter:string;
  doctors: Doctor[];
  editingRow: boolean[] = []; // This will keep track of rows being edited
  editedDoctor: any[] = [];

  constructor(private doctorService: DoctorService, private router: Router) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (doctors: Doctor[]) => {
        this.doctors = doctors;
      },
      (error) => {
        console.error('Error fetching staffs:', error);
      }
    );
  }

  matchesFilter(doctor: any): boolean {
    if (!this.filter) {
      // If filter is empty or undefined, show all doctors
      return true;
    }
    // Convert filter and doctor properties to lowercase for case-insensitive comparison
    const searchTerm = this.filter.toLowerCase();
    const doctorProperties = Object.values(doctor).join(' ').toLowerCase(); // Combine all object values for comparison

    return doctorProperties.includes(searchTerm);
}

editRow(index: number): void {
    this.editingRow[index] = true;
    // Create a copy of the current row's data to enable editing
    this.editedDoctor[index] = { ...this.doctors[index] };
}

saveRow(index: number): void {
    // Call update service to send the updated data to the server
    const doctorId = this.doctors[index].doctor_id;
    const updatedData = this.editedDoctor[index];
  
    this.doctorService.updateDoctor(doctorId, updatedData).subscribe(
      response => {
        console.log('Update successful', response);
        
        // Fetch the updated data from the server again
        this.doctorService.getDoctors().subscribe(
          updatedDoctors => {
            // Update the doctors array with the updated data
            this.doctors = updatedDoctors;
          },
          error => {
            console.error('Error fetching updated doctor data', error);
            // Handle error appropriately
          }
        );
      },
      error => {
        console.error('Error updating doctor', error);
        // Handle error appropriately
      }
    );
  
    // Reset editing state
    this.editingRow[index] = false;
}

deleteRow(index: number): void {
    // Check if the index is within the bounds of the doctors array
    if (index >= 0 && index < this.doctors.length) {
        // Extract the doctor ID
        const doctorId = this.doctors[index].doctor_id;

        // Toggle the is_active property of the doctor object at the specified index
        this.doctors[index].is_active = !this.doctors[index].is_active;

        // Call the updateDoctor method from the service to update the is_active status
        this.doctorService.updateDoctorIsActive(doctorId, this.doctors[index].is_active).subscribe(
            response => {
                console.log('Update successful', response);
                // Change the color of the row after a successful update
                const rowElement = document.getElementById(`doctor-row-${doctorId}`);
                if (rowElement) {
                    rowElement.classList.toggle('inactive-row');
                }
            },
            error => {
                console.error('Error updating doctor record', error);
                // Revert the change if there's an error
                this.doctors[index].is_active = !this.doctors[index].is_active;
            }
        );
    } else {
        console.error('Invalid index:', index);
    }
}

}
