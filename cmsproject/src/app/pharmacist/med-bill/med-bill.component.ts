import { Component, OnInit } from '@angular/core';
import { DiagnosisService } from 'src/app/tables/diagnosis.service';

@Component({
  selector: 'app-med-bill',
  templateUrl: './med-bill.component.html',
  styleUrls: ['./med-bill.component.scss']
})
export class MedBillComponent implements OnInit {

  diagnosisList: any[] = []; 

  constructor(private diagnosisService:DiagnosisService) { }

  ngOnInit(): void {
    this.fetchBillDetails();
  }

  fetchBillDetails() {
    this.diagnosisService.getBillDetails().subscribe(
      (data) => {
        this.diagnosisList = data; // Assuming data is an array of diagnosis details
      },
      (error) => {
        console.error('Error fetching bill details:', error);
      }
    );
  }

  printBill() {
    window.print();
}

}
