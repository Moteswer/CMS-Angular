import { Component, OnInit } from '@angular/core';
import { DiagnosisService } from 'src/app/tables/diagnosis.service';

@Component({
  selector: 'app-lab-bill',
  templateUrl: './lab-bill.component.html',
  styleUrls: ['./lab-bill.component.scss']
})
export class LabBillComponent implements OnInit {

  diagnosisList: any[] = []; // Assuming diagnosisList is an array of objects with test name property
  diagnosisId: number


  constructor(private diagnosisService: DiagnosisService) { }

  ngOnInit(): void {
    this.diagnosisService.getDiagnosisDetails().subscribe(
      (data) => {
        this.diagnosisList = data.map((item) => ({ ...item, isTestNameNullString: item.test === 'null' }));
        console.log('Diagnosis List:', this.diagnosisList);
        console.log('Button should be disabled:', this.isTestNameNull());
      },
      (error) => {
        console.error('Error fetching diagnosis list:', error);
      }
    );
  }

  isTestNameNull(): boolean {
    return this.diagnosisList.some(diagnosis => diagnosis.isTestNameNullString);
  }

  getTotalAmount(): number {
    const testAmount = this.diagnosisList[0].test[0].price;
    const gstAmount = testAmount; // Assuming GST rate is 18%, adjust accordingly
    return testAmount + gstAmount;
  }

  printBill() {
    window.print();
  }



}
