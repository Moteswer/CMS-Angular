import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Staffs } from 'src/app/tables/staffs';
import { StaffsService } from 'src/app/tables/staffs.service';

@Component({
  selector: 'app-list-staffs',
  templateUrl: './list-staffs.component.html',
  styleUrls: ['./list-staffs.component.scss']
})
export class ListStaffsComponent implements OnInit {
  filter:string;
  staffs: Staffs[];
  editingRow: boolean[] = []; // This will keep track of rows being edited
  editedStaff: any[] = [];
  

  constructor(private staffsService: StaffsService, private router: Router) { }

  ngOnInit(): void {
    this.getStaffs();
  }

  getStaffs(): void {
    this.staffsService.getStaffs().subscribe(
      (staffs: Staffs[]) => {
        this.staffs = staffs;
      },
      (error) => {
        console.error('Error fetching staffs:', error);
      }
    );
  }
  
   



  matchesFilter(emp: any): boolean {
    if (!this.filter) {
      // If filter is empty or undefined, show all staffs
      return true;
    }
    // Convert filter and emp properties to lowercase for case-insensitive comparison
    const searchTerm = this.filter.toLowerCase();
    const empProperties = Object.values(emp).join(' ').toLowerCase(); // Combine all object values for comparison

    return empProperties.includes(searchTerm);
  }



  editRow(index: number): void {
    this.editingRow[index] = true;
    // Create a copy of the current row's data to enable editing
    this.editedStaff[index] = { ...this.staffs[index] };
  }

  // Implement saveRow method to save the changes made to a row
  saveRow(index: number): void {
    // Call update service to send the updated data to the server
    const staffId = this.staffs[index].staff_id;
    const updatedData = this.editedStaff[index];
  
    this.staffsService.updateStaff(staffId, updatedData).subscribe(
      response => {
        console.log('Update successful', response);
        
        // Fetch the updated data from the server again
        this.staffsService.getStaffs().subscribe(
          updatedStaffs => {
            // Update the staffs array with the updated data
            this.staffs = updatedStaffs;
          },
          error => {
            console.error('Error fetching updated staff data', error);
            // Handle error appropriately
          }
        );
      },
      error => {
        console.error('Error updating staff', error);
        // Handle error appropriately
      }
    );
  
    // Reset editing state
    this.editingRow[index] = false;
  }

  deleteRow(index: number): void {
    // Check if the index is within the bounds of the staffs array
    if (index >= 0 && index < this.staffs.length) {
        // Extract the staff ID
        const staffId = this.staffs[index].staff_id;

        // Toggle the is_active property of the staff object at the specified index
        this.staffs[index].is_active = !this.staffs[index].is_active;

        // Call the updateStaff method from the service to update the is_active status
        this.staffsService.updateStaffIsActve(staffId, this.staffs[index].is_active).subscribe(
            response => {
                console.log('Update successful', response);
                // Change the color of the row after a successful update
                const rowElement = document.getElementById(`staff-row-${staffId}`);
                if (rowElement) {
                    rowElement.classList.toggle('inactive-row');
                }
            },
            error => {
                console.error('Error updating staff record', error);
                // Revert the change if there's an error
                this.staffs[index].is_active = !this.staffs[index].is_active;
            }
        );
    } else {
        console.error('Invalid index:', index);
    }
}

  
  
  
  
}
