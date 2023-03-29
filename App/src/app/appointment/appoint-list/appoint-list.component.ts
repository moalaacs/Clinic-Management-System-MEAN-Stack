import { Component } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/shared/delete-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-appoint-list',
  templateUrl: './appoint-list.component.html',
  styleUrls: ['./appoint-list.component.css']
})
export class AppointListComponent {
  appointment: Appointment[] = [];
  constructor(
    public appointmentService: AppointmentService, 
    public router: Router, 
    public location: Location, 
    public dialog: MatDialog, 
    public snackBar: MatSnackBar) {
  }
  delete(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appointmentService.deleteAppointmentById(id).subscribe(() => {
          const index = this.appointment.findIndex(p => p._id === id);
          if (index >= 0) {
            this.appointment.splice(index, 1);
            this.snackBar.open('Appointment deleted successfully!', 'Close', {
              duration: 2000
            });
          }
        })
      }
    });
  }
  ngOnInit() {
    this.appointmentService.getAllAppointment().subscribe(data => {
      this.appointment = data.appointments;
    })
  }
}
