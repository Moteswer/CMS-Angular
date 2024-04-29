import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ListStaffsComponent } from './admin/list-staffs/list-staffs.component';
import { ListDoctorsComponent } from './admin/list-doctors/list-doctors.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
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
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LabDoctorComponent } from './lab-technician/lab-doctor/lab-doctor.component';
import { LabBillComponent } from './lab-technician/lab-bill/lab-bill.component';
import { ReportComponent } from './lab-technician/report/report.component';
import { ViewReportComponent } from './lab-technician/view-report/view-report.component';
// import { DoctorPrescriptionComponent } from './pharmacist/doctor-prescription/doctor-prescription.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AddStaffComponent,
    AddDoctorComponent,
    ListStaffsComponent,
    ListDoctorsComponent,
    HomeComponent,
    AddPatientComponent,
    ListPatientsComponent,
    BookappointmentComponent,
    NewBookappointmentComponent,
    BillComponent,
    NeurologistComponent,
    CardiologistComponent,
    PediatricianComponent,
    DiagnosisComponent,
    PharmacistComponent,
    ListMedicineComponent,
    AddMedicineComponent,
    DoctorPrescriptionComponent,
    GiveMedicineComponent,
    MedBillComponent,
    HomepageComponent,
    ListTestComponent,
    AddTestComponent,
    LabDoctorComponent,
    LabBillComponent,
    ReportComponent,
    ViewReportComponent,

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot({
      timeOut:10000,
      positionClass:'toast-top-right',
      preventDuplicates:true
      }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
