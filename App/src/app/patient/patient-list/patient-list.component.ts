import { Component, OnInit } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from '../../shared/delete-confirmation.component';

import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];

  constructor(
    private patientService: PatientService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.patientService.getAllPatients().pipe(
      map(response => response.data),
      tap(response => console.log('Response from getAllPatients:', response))
    ).subscribe(
      data => this.patients = data,
      error => console.log('Error retrieving patients: ', error)
    );
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
