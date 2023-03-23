import { Component , OnInit} from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from '../../shared/delete-confirmation.component';


import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent {

  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }


    ngOnInit(): void {
      this.doctorService.getAllDoctors().pipe(
        map(response => response.data),
        tap(response => console.log('Response from getAlldoctors:', response))
      ).subscribe(
        data => this.doctors = data,
        error => console.log('Error retrieving doctors: ', error)
      );
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
