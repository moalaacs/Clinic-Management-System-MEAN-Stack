import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { DeleteConfirmationComponent } from '../../shared/delete-confirmation.component';
import { clinic } from 'src/app/models/clinic';
import { ClinicService } from 'src/app/services/clinic.service';
@Component({
  selector: 'app-clinics-list',
  templateUrl: './clinics-list.component.html',
  styleUrls: ['./clinics-list.component.css']
})
export class ClinicsInfoComponent implements OnInit {
  clinics: clinic[];
  perPage = 10;
  total = 0;
  currentPage = 1;
  query: string | undefined;
  sortBy!: string;
  order: "asc" | "desc" = "asc";
  dataSource!: MatTableDataSource<clinic>;
  displayedColumns: string[] = [
    'no',
    'email',
    'phoneNumber',
    'specilization',
    'address',
    'actions',
  ];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clinicService: ClinicService, private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.clinics = [];
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.getClinics();
  }

  getClinics() {
    const startIndex = (this.currentPage - 1) * this.perPage;
    const endIndex = startIndex + this.perPage;
    if (endIndex > this.clinics.length) {
      this.clinicService
        .getAllClinicsQuery(
          this.query,
          this.currentPage,
          this.perPage,
          this.sortBy,
          this.order
        )
        .subscribe(
          (response) => {
            this.clinics = response.data;
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
          return item._id;
        case 'phoneNumber':
          return item._contactNumber;
        case 'address':
          return item._address.city;
        case 'specilization':
          return item._specilization;
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
    if (this.clinics.length < this.total) {
      this.getClinics();
    }
  }

  deleteClinic(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clinicService.deleteClinicById(id).subscribe(() => {
          const index = this.clinics.findIndex(p => p._id === id);
          if (index >= 0) {
            this.clinics.splice(index, 1);
            this.snackBar.open('Clinic deleted', 'Close', {
              duration: 2000
            });
          }
        });
      }
    });
  }
}
