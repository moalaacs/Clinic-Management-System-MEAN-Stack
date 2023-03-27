import { Component, OnInit, ViewChild } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

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
  perPage = 10;
  total = 0;
  currentPage = 1;
  query: string | undefined;
  sortBy!: string  ;
  order: "asc" | "desc" = "asc" ;

  dataSource!: MatTableDataSource<Employee>;
  displayedColumns: string[] = [
    'no',
    'name',
    'age',
    'phoneNumber',
    'address',
    'role',
    'actions',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator)  paginator!: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getEmployees();
  }

  getEmployees() {
    const startIndex = (this.currentPage - 1) * this.perPage;
    const endIndex = startIndex + this.perPage;
    if (endIndex > this.employees.length ) {
      this.employeeService
        .getAllEmployees2(
          'employee',
          this.query,
          this.currentPage,
          this.perPage,
          this.sortBy,
          this.order
        )
        .subscribe(
          (response) => {
            this.employees = response.data;
            this.total = response.total;
            this.dataSource.data = response.data;
          },
          (error) => console.log(error)
        );
  }
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'no':
          return item.id;
        case 'name':
          return item.firstname;
        case 'age':
          return item.age;
        case 'phoneNumber':
          return item.phoneNumber;
        case 'address':
          return item.address.city;
        case 'role':
          return item.role;
        default:
          return 0;
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.perPage = event.pageSize;
    if(this.employees.length < this.total){
    this.getEmployees();
  }
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
