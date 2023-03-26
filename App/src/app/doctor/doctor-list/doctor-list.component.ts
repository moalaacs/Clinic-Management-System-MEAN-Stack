import { Component , OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { DeleteConfirmationComponent } from '../../shared/delete-confirmation.component';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  doctors: Doctor[] = [];
  perPage = 10;
  total = 0;
  currentPage = 1;
  query: string | undefined;
  sortBy!: string  ;
  order: "asc" | "desc" = "asc" ;

  dataSource!: MatTableDataSource<Doctor>;
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


  constructor(private doctorService: DoctorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }


    ngOnInit(): void {
      this.dataSource = new MatTableDataSource();
      this.getDoctors();
    }

    getDoctors() {
      this.doctorService
        .getAllDoctors2(
          'doctor',
          this.query,
          this.currentPage,
          this.perPage,
          this.sortBy,
          this.order
        )
        .subscribe(
          (response) => {
            this.doctors = response.data;
            this.total = response.total;
            this.dataSource.data = response.data;
            console.log(this.dataSource)
          },
          (error) => console.log(error)
        );
    }

    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'no':
            return item.id;
          case 'name':
            return item.firstname;
          case 'email':
            return item.email;
          case 'age':
            return item.age;
          case 'phoneNumber':
            return item.phoneNumber;
          case 'address':
            return item.address.city;
          case 'role':
            return item.speciality;
          case 'clinicAddress':
            return item.clinicId._address.city;
          case 'clinicSpecialization':
            return item.clinicId._specilization;
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
      this.getDoctors();
    }


    deleteDoctor(id: number) {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.doctorService.removeDoctorById(id).subscribe(() => {
            const index = this.doctors.findIndex(p => p.id === id);
            if (index >= 0) {
              this.doctors.splice(index, 1);
              this.snackBar.open('Doctor deleted', 'Close', {
                duration: 2000
              });
            }
          });
        }
      });
    }

}
