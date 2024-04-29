import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public adminService:AdminService,private router:Router) { }

  navigateToAddStaffForm() {
    this.router.navigate(['/add-staff']);
  }

  navigateToAddDoctorForm() {
    this.router.navigate(['/add-doctor']);
  }

  navigateToStaffList() {
    this.router.navigate(['/list-staffs']);
  }

  navigateToDoctorList() {
    this.router.navigate(['/list-doctors']);
  }


  

  ngOnInit(): void {
  }

}
