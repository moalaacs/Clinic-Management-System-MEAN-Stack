import { Component } from '@angular/core';
import { Medicine } from 'src/app/models/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/shared/delete-confirmation.component';

@Component({
  selector: 'app-med-list',
  templateUrl: './med-list.component.html',
  styleUrls: ['./med-list.component.css']
})
export class MedListComponent {
  medicine: Medicine[] = [];
  constructor(public medicineService: MedicineService, public router: Router, public location: Location, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }
  delete(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.medicineService.deleteMedicineById(id).subscribe(() => {
          const index = this.medicine.findIndex(p => p._id === id);
          if (index >= 0) {
            this.medicine.splice(index, 1);
            this.snackBar.open('Medicine deleted successfully!', 'Close', {
              duration: 2000
            });
          }
        })
      }
    });
  }
  ngOnInit() {
    this.medicineService.getAllMedicine().subscribe(data => {
      this.medicine = data;
    })
  }
}
