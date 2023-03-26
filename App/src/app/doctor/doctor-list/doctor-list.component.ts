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
    'email',
    'age',
    'phoneNumber',
    'address',
    'role',
    'clinicAddress',
    'clinicSpecialization',
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


    // sortData() {
    //   let sortFunction =
    //   (items: Doctor[], sort: MatSort): Doctor[] =>  {
    //     if (!sort.active || sort.direction === '') {
    //       return items;
    //     }
    //   return items.sort((a: Doctor, b: Doctor) => {
    //     let comparatorResult = 0;
    //     switch (sort.active) {
    //       case 'name':
    //         comparatorResult = a.firstname.localeCompare(b.firstname);
    //         break;
    //       case 'email':
    //         comparatorResult = a.email.localeCompare(b.email);
    //         break;
    //       case 'age':
    //         comparatorResult = a.age - b.age;
    //         break;
    //       case 'phoneNumber':
    //         comparatorResult = a.phoneNumber.localeCompare(b.phoneNumber);
    //         break;
    //       case 'address':
    //         comparatorResult = a.address.city.localeCompare(b.address.city);
    //         break;
    //       case 'role':
    //         comparatorResult = a.speciality.localeCompare(b.speciality);
    //         break;
    //       case 'clinicAddress':
    //         comparatorResult = a.clinicId._address.city.localeCompare(b.clinicId._address.city);
    //         break;
    //       case 'clinicSpecialization':
    //         comparatorResult = a.clinicId._specilization.localeCompare(b.clinicId._specilization);
    //         break;
    //       default:
    //         return 0;
    //     }
    //      return comparatorResult * (sort.direction == 'asc' ? 1 : -1);
    //     });
    //   };
    //   return sortFunction;
    // }




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
