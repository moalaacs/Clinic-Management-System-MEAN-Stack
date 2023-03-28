import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


import { DeleteConfirmationComponent } from '../../shared/delete-confirmation.component';

import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];
  perPage = 10;
  total = 0;
  currentPage = 1;
  query: string | undefined;
  sortBy: string = "id";
  order: "asc" | "desc" = "asc";

  dataSource!: MatTableDataSource<Patient>;
  displayedColumns: string[] = [
    'no',
    'name',
    'age',
    'phoneNumber',
    'address',
    'actions',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(
    private patientService: PatientService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getPatients();
  }

  getPatients() {
    const startIndex = (this.currentPage - 1) * this.perPage;
    const endIndex = startIndex + this.perPage;
    if (endIndex > this.patients.length) {
      this.patientService
        .getAllPatients2(
          'patient',
          this.query,
          this.currentPage,
          this.perPage,
          this.sortBy,
          this.order
        )
        .subscribe((response) => {
          this.patients = response.patients;
          this.total = response.total;
          this.dataSource.data = response.data;
        });
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
    if (this.patients.length < this.total) {
      this.getPatients();
    }
  }



  deletePatient(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.removePatientById(id).subscribe(() => {
          const index = this.patients.findIndex(p => p.id === id);
          if (index >= 0) {
            this.patients.splice(index, 1);
            this.snackBar.open('Patient deleted', 'Close', {
              duration: 2000
            });
          }
        });
      }
    });
  }



}
