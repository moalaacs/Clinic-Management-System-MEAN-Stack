import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Prescription } from 'src/app/models/prescription';
import { prescriptionService } from 'src/app/services/prescription.service';
import { DeleteConfirmationComponent } from 'src/app/shared/delete-confirmation.component';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent {
  prescriptions:Prescription[]=[];
  constructor(public prescriptionService:prescriptionService,private dialog: MatDialog,private snackBar: MatSnackBar){}
  ngOnInit(){
    this.prescriptionService.getAllPrescriptions().subscribe(prescriptionsArray=>{
      this.prescriptions=prescriptionsArray;
    })
  }
  delete(id:number){
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.prescriptionService.deletePrescriptionsById(id).subscribe(()=>{
          const index = this.prescriptions.findIndex(p => p._id === id);
                if (index >= 0) {
                  this.prescriptions.splice(index, 1);
                  this.snackBar.open('Prescriptions deleted', 'Close', {
                    duration: 2000
                  });
                }
        })
      }
    });
  }
}


