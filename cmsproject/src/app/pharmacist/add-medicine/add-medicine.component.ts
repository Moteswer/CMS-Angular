import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/tables/medicine';
import { MedicineService } from 'src/app/tables/medicine.service';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.scss']
})
export class AddMedicineComponent implements OnInit {

  newMedicine: Medicine = new Medicine();
  medicines: Medicine[] = [];

  constructor(private medicineService:MedicineService) { }

  ngOnInit(): void {
  }

  minExpiryDate(): string {
    return new Date().toISOString().split('T')[0]; // Returns today's date in 'YYYY-MM-DD' format
  }

  addMedicine(): void {
    this.medicineService.addMedicine(this.newMedicine).subscribe(
      (response: Medicine) => {
        console.log('New medicine added:', response);
        // Refresh medicines list or update as needed
        this.medicines.push(response);
        // Reset newMedicine object
        this.newMedicine = new Medicine();
        alert('Medicine Added Successfully')
        window.history.back();
        
      },
      error => {
        console.error('Error adding new medicine:', error);
        // Handle error appropriately
      }
    );
  }

  
}

