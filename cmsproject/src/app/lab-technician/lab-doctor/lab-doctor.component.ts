import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiagnosisService } from 'src/app/tables/diagnosis.service';
import { MedicineService } from 'src/app/tables/medicine.service';

@Component({
  selector: 'app-lab-doctor',
  templateUrl: './lab-doctor.component.html',
  styleUrls: ['./lab-doctor.component.scss']
})
export class LabDoctorComponent implements OnInit {

  diagnosisList: any[] = []; // Assuming diagnosisList is an array of objects with test name property
  diagnosisId: number

  constructor(private diagnosisService: DiagnosisService, private router: Router, private medicineService: MedicineService) { }

  ngOnInit(): void {
    this.diagnosisService.getDiagnosisDetails().subscribe(
      (data) => {
        // Filtering out null values from the data array
        const filteredData = data.filter(item => item.diagnosis.test !== 'null');

        // Mapping the filtered data
        this.diagnosisList = filteredData.map((item) => ({ ...item, isTestNameNullString: false }));
        console.log('Diagnosis List:', this.diagnosisList);
        console.log('Button should be disabled:', this.isTestNameNull());
      },
      (error) => {
        console.error('Error fetching diagnosis list:', error);
      }
    );
  }

  // Assuming this function checks if the test name is null
  isTestNameNull(): boolean {
    return this.diagnosisList.some(item => item.test === null);
  }

  checkMedicine(medicineName: string): void {
    // Check if the medicine exists by nam
    // If the medicine exists by name, get its ID
    this.medicineService.getMedicineIdByName(medicineName).subscribe(
      (medicineId: number) => {
        if (medicineId) {
          // If the ID is obtained, check if the medicine exists by ID
          this.medicineService.checkMedicineExistsById(medicineId).subscribe(
            (existsById: boolean) => {
              if (existsById) {
                console.log('Medicine', medicineName, 'exists in the database.');
              } else {
                console.log('Medicine', medicineName, 'does not exist in the database.');
              }
            },
            (error) => {
              this.router.navigate(['lab-bill'], { queryParams: { diagnosisId: this.diagnosisId } });
            }
          );
        } else {
          console.log('Error: Medicine ID not found for', medicineName);
        }
      },
      (error) => {
        alert('Test not found')
      }

    )
  }

  
}


