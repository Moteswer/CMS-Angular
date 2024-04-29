import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ListStaffsComponent } from './admin/list-staffs/list-staffs.component';
import { ListDoctorsComponent } from './admin/list-doctors/list-doctors.component';
import { AuthGuard } from '../app/login/authguard.service';
import { HomeComponent } from './receptionist/home/home.component';
import { AddPatientComponent } from './receptionist/add-patient/add-patient.component';
import { ListPatientsComponent } from './receptionist/list-patients/list-patients.component';
import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { NewBookappointmentComponent } from './new-bookappointment/new-bookappointment.component';
import { BillComponent } from './bill/bill.component';
import { NeurologistComponent } from './doctors/neurologist/neurologist.component';
import { CardiologistComponent } from './doctors/cardiologist/cardiologist.component';
import { PediatricianComponent } from './doctors/pediatrician/pediatrician.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { PharmacistComponent } from 'src/app/pharmacist/pharmacist.component';
import { ListMedicineComponent } from './pharmacist/list-medicine/list-medicine.component';
import { AddMedicineComponent } from './pharmacist/add-medicine/add-medicine.component';
import { DoctorPrescriptionComponent } from './pharmacist/doctor-prescription/doctor-prescription.component';
import { GiveMedicineComponent } from './pharmacist/give-medicine/give-medicine.component';
import { MedBillComponent } from './pharmacist/med-bill/med-bill.component';
import { HomepageComponent } from './lab-technician/homepage/homepage.component';
import { ListTestComponent } from './lab-technician/list-test/list-test.component';
import { AddTestComponent } from './lab-technician/add-test/add-test.component';
import { LabDoctorComponent } from './lab-technician/lab-doctor/lab-doctor.component';
import { LabBillComponent } from './lab-technician/lab-bill/lab-bill.component';
import { ReportComponent } from './lab-technician/report/report.component';
import { ViewReportComponent } from './lab-technician/view-report/view-report.component';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'add-staff', component: AddStaffComponent },
  { path: 'add-doctor', component: AddDoctorComponent },
  { path: 'list-staffs', component: ListStaffsComponent },
  { path: 'list-doctors', component: ListDoctorsComponent },
  { path: 'receptionist', component: HomeComponent, },
  { path: 'add-patient', component: AddPatientComponent },
  { path: 'list-patients', component: ListPatientsComponent },
  { path: 'book-appointment/:phoneNumber', component: BookappointmentComponent },
  { path: 'new-bookappointment/:patientId', component: NewBookappointmentComponent },
  { path: 'bill/:patientId', component: BillComponent },
  { path: 'neurologist', component: NeurologistComponent },
  { path: 'cardiologist', component: CardiologistComponent },
  { path: 'pediatrician', component: PediatricianComponent },
  { path: 'diagnosis', component: DiagnosisComponent },
  { path: 'pharmacist', component: PharmacistComponent },
  // canActivate: [AuthGuard]

  { path: 'add-medicine', component: AddMedicineComponent },
  { path: 'medicine-list', component: ListMedicineComponent },
  { path: 'doctor-prescription', component: DoctorPrescriptionComponent },
  { path: 'give-med', component: GiveMedicineComponent },
  { path: 'med-bill', component: MedBillComponent },
  { path: 'lab-technician', component: HomepageComponent },
  { path: 'list-test', component: ListTestComponent },
  {path:'add-test',component:AddTestComponent},
  {path:'doc-pres',component:LabDoctorComponent},
  {path:'lab-bill',component:LabBillComponent},
  {path:'lab-report',component:ReportComponent},
  {path:'report-page',component:ViewReportComponent},
   


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
