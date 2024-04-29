import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Test } from 'src/app/tables/test';
import { TestService } from 'src/app/tables/test.service';

@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.scss']
})
export class ListTestComponent implements OnInit {
  tests: Test[] = [];
  editingRow: boolean[] = []; // This will keep track of rows being edited
  editedTest: Test = new Test();
  filter: string;

  constructor(private testService: TestService, private router: Router) { }

  ngOnInit(): void {
    this.getTests();
  }
  
  onAdd(): void {
    this.router.navigate(['add-test']);
  }

  getTests(): void {
    this.testService.getAllTests().subscribe(
      (tests: Test[]) => {
        this.tests = tests;
        this.initializeEditingStates(); // Initialize editing state for each test
      },
      (error) => {
        console.error('Error fetching tests:', error);
      }
    );
  }

  initializeEditingStates(): void {
    this.editingRow = new Array(this.tests.length).fill(false); // Initialize editing state for each test
  }

  editRow(index: number): void {
    this.editingRow[index] = true;
    // Create a copy of the current test's data to enable editing
    this.editedTest = { ...this.tests[index] };
  }

  saveRow(index: number): void {
    // Call update service to send the updated data to the server
    this.testService.updateTest(this.editedTest).subscribe(
      response => {
        console.log('Update successful', response);
        // Fetch the updated data from the server again
        this.getTests();
      },
      error => {
        console.error('Error updating test', error);
        // Handle error appropriately
      }
    );

    // Reset editing state
    this.editingRow[index] = false;
  }

  cancelEdit(index: number): void {
    // Reset editing state and discard changes
    this.editingRow[index] = false;
    this.editedTest = new Test(); // Clear edited test object
  }

  disableRow(index: number): void {
    const test = this.tests[index];
    test.is_active = !test.is_active; // Toggle is_active property

    this.testService.toggleActiveTest(test.test_id).subscribe(
      response => {
        console.log('Toggle active test successful', response);
        // Fetch the updated data from the server again
        this.getTests();
      },
      error => {
        console.error('Error toggling active test', error);
        // Handle error appropriately
      }
    );
  }
}
