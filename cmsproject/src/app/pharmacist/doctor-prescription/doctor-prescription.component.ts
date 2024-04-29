import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DiagnosisService } from 'src/app/tables/diagnosis.service';
import { MedicineService } from 'src/app/tables/medicine.service';

@Component({
  selector: 'app-doctor-prescription',
  templateUrl: './doctor-prescription.component.html',
  styleUrls: ['./doctor-prescription.component.scss']
})
export class DoctorPrescriptionComponent implements OnInit {

  diagnosisList: any[];
  diagnosisId:number
  

  constructor(private diagnosisService: DiagnosisService, private router: Router, private medicineService: MedicineService) { }

  ngOnInit(): void {
    this.diagnosisService.getAllDiagnosisWithDetails().subscribe(
      (data) => {
        this.diagnosisList = data;
        console.log('Diagnosis List:', data);
      },
      (error) => {
        console.error('Error fetching diagnosis list:', error);
      }
    );
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
              this.router.navigate(['give-med'], { queryParams: { diagnosisId: this.diagnosisId } });
            }
          );
        } else {
          console.log('Error: Medicine ID not found for', medicineName);
        }
      },
      (error) => {
        alert('Medicine not found! please contact any other shop')
      }
   
    )}}

