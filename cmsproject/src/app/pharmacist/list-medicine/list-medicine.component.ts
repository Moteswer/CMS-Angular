import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicine } from 'src/app/tables/medicine';
import { MedicineService } from 'src/app/tables/medicine.service'

@Component({
  selector: 'app-list-medicine',
  templateUrl: './list-medicine.component.html',
  styleUrls: ['./list-medicine.component.scss']
})
export class ListMedicineComponent implements OnInit {

  filter: string;
  medicines: Medicine[] = [];
  editingRow: boolean[] = []; // This will keep track of rows being edited
  editedMedicine: Medicine[] = [];

  constructor(private medicineService: MedicineService,private router:Router) { }

  ngOnInit(): void {
    this.getMedicines();
  }

  getMedicines(): void {
    this.medicineService.getMedicines().subscribe(
      (medicines: Medicine[]) => {
        this.medicines = medicines;
      },
      (error) => {
        console.error('Error fetching medicines:', error);
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
    this.editedMedicine[index] = { ...this.medicines[index] };
  }

  saveRow(index: number): void {
    // Call update service to send the updated data to the server
    const medicineId = this.medicines[index].medicine_id;
    const updatedData = this.editedMedicine[index];

    this.medicineService.updateMedicine(medicineId, updatedData).subscribe(
      response => {
        console.log('Update successful', response);

        // Fetch the updated data from the server again
        this.medicineService.getMedicines().subscribe(
          updatedDoctors => {
            // Update the doctors array with the updated data
            this.medicines = updatedDoctors;
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
    if (index >= 0 && index < this.medicines.length) {
      // Extract the doctor ID
      const patientId = this.medicines[index].medicine_id;

      // Toggle the is_active property of the doctor object at the specified index
      this.medicines[index].is_active = !this.medicines[index].is_active;

      // Call the updateDoctor method from the service to update the is_active status
      this.medicineService.updatePatientIsActive(patientId, this.medicines[index].is_active).subscribe(
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
          this.medicines[index].is_active = !this.medicines[index].is_active;
        }
      );
    } else {
      console.error('Invalid index:', index);
    }
  }

  navigateToAddMedicineForm() {
    // Assuming you have a route named 'medicine-list' defined in your routing module
    this.router.navigate(['add-medicine']);
  }

}

