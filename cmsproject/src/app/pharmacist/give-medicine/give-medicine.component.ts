import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiagnosisService } from 'src/app/tables/diagnosis.service';

@Component({
  selector: 'app-give-medicine',
  templateUrl: './give-medicine.component.html',
  styleUrls: ['./give-medicine.component.scss']
})
export class GiveMedicineComponent implements OnInit {

  quantity: number = 0;
  mrp: number = 0;

  selectedRow: any;

  diagnosisList: any[];

  constructor(private diagnosisService:DiagnosisService,private http:HttpClient,private router:Router) { }

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

  calculateMRP(): void {
    // Assuming you have a formula to calculate MRP based on quantity
    // Replace this with your actual calculation logic
    this.mrp = this.quantity * 10; // For example, MRP = quantity * 10
  }

  generateBill() {
    const billDetails = {
        diagnosis_id: this.diagnosisList[0].diagnosis.diagnosis_id,
        patient_name: this.diagnosisList[0].patient.first_name,
        doctor_name: this.diagnosisList[0].doctor.first_name,
        medicine_name: this.diagnosisList[0].diagnosis.medicine,
        contact_number: this.diagnosisList[0].patient.phone_number,
        dosage: this.diagnosisList[0].diagnosis.dosage,
        quantity: this.quantity,
        mrp: this.mrp
    };

    this.http.post<any>('http://127.0.0.1:8000/api/bills/', billDetails)
        .subscribe(
            response => {
                console.log('Bill saved successfully', response);
                alert('Bill generated successfully');
                this.router.navigate(['med-bill'])

                // Optionally, perform any additional actions after saving the bill
            },
            error => {
                console.error('Error saving bill', error);
                // Handle error if needed
            }
        );
}
}