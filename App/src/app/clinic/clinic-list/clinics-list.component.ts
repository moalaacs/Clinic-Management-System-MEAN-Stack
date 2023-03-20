import { Component, OnInit } from '@angular/core';
import { ClinicService } from 'src/app/services/clinic.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from '../../shared/delete-confirmation.component';
import { IClinic } from 'src/app/models/IClinic';
@Component({
  selector: 'app-clinics-list',
  templateUrl: './clinics-list.component.html',
  styleUrls: ['./clinics-list.component.css']
})
export class ClinicsInfoComponent implements OnInit {
  clinics: IClinic[];
  constructor(private clinicService: ClinicService, private rotue: ActivatedRoute, private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.clinics = [];
  }
  ngOnInit() {
    this.clinicService.getClinics().subscribe(data => this.clinics = data);
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
