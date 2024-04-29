import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/tables/patient';
import { PatientService } from 'src/app/tables/patient.service';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss']
})
export class ListPatientsComponent implements OnInit {
  filter:string;
  patients: Patient[];
  editingRow: boolean[] = []; // This will keep track of rows being edited
  editedDoctor: any[] = [];

  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe(
      (patients: Patient[]) => {
        this.patients = patients;
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
    this.editedDoctor[index] = { ...this.patients[index] };
}

saveRow(index: number): void {
    // Call update service to send the updated data to the server
    const doctorId = this.patients[index].patient_id;
    const updatedData = this.editedDoctor[index];
  
    this.patientService.updatePatient(doctorId, updatedData).subscribe(
      response => {
        console.log('Update successful', response);
        
        // Fetch the updated data from the server again
        this.patientService.getPatients().subscribe(
          updatedDoctors => {
            // Update the doctors array with the updated data
            this.patients = updatedDoctors;
          },
          error => {
            console.error('Error fetching updated patient data', error);
            // Handle error appropriately
          }
        );
      },
      error => {
        console.error('Error updating patient', error);
        // Handle error appropriately
      }
    );
  
    // Reset editing state
    this.editingRow[index] = false;
}

deleteRow(index: number): void {
    // Check if the index is within the bounds of the doctors array
    if (index >= 0 && index < this.patients.length) {
        // Extract the doctor ID
        const patientId = this.patients[index].patient_id;

        // Toggle the is_active property of the doctor object at the specified index
        this.patients[index].is_active = !this.patients[index].is_active;

        // Call the updateDoctor method from the service to update the is_active status
        this.patientService.updatePatientIsActive(patientId, this.patients[index].is_active).subscribe(
            response => {
                console.log('Update successful', response);
                // Change the color of the row after a successful update
                const rowElement = document.getElementById(`doctor-row-${patientId}`);
                if (rowElement) {
                    rowElement.classList.toggle('inactive-row');
                }
            },
            error => {
                console.error('Error updating doctor record', error);
                // Revert the change if there's an error
                this.patients[index].is_active = !this.patients[index].is_active;
            }
        );
    } else {
        console.error('Invalid index:', index);
    }
}

}

