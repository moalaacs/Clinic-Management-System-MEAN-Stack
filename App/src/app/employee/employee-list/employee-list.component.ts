import { Component, OnInit } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from '../../shared/delete-confirmation.component';

import { Employee } from '../../models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit  {

  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().pipe(
      map(response => response.data),
      tap(response => console.log('Response from getAllEmployees:', response))
    ).subscribe(
      data => this.employees = data,
      error => console.log('Error retrieving employees: ', error)

    );
  }

  deleteEmployee(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.removeEmployeeById(id).subscribe(() => {
          const index = this.employees.findIndex(p => p.id === id);
          if (index >= 0) {
            this.employees.splice(index, 1);
            this.snackBar.open('Employee deleted', 'Close', {
              duration: 2000
            });
          }
        });
      }
    });
  }

}
