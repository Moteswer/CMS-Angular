import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/tables/test.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Test } from 'src/app/tables/test';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent implements OnInit {
  newTest: Test = new Test();

  constructor(
    public testService: TestService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.newTest.id) {
      console.log('Inserting...', this.newTest);
      this.insertRecord();
    } else {
      console.log('Updating...', this.newTest);
      this.updateRecord();
    }
  }

  insertRecord(): void {
    this.testService.insertTest(this.newTest).subscribe(
      (result) => {
        console.log(result);
        this.resetForm();
        this.toastr.success('Test added successfully');
        this.router.navigate(['test-list']);
        window.history.back()
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding test:', error);
        this.toastr.error('Failed to add test');
      }
    );
  }

  updateRecord(): void {
    this.testService.updateTest(this.newTest).subscribe(
      (result) => {
        console.log(result);
        this.resetForm();
        this.toastr.success('Test updated successfully');
        this.router.navigate(['test-list']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating test:', error);
        this.toastr.error('Failed to update test');
      }
    );
  }

  resetForm(): void {
    this.newTest = new Test();
  }
}
