import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Prescription } from 'src/app/models/prescription';
import { prescriptionService } from 'src/app/services/prescription.service';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent {
  prescriptions:Prescription[]=[];
  constructor(public prescriptionService:prescriptionService,private router:Router){}
  ngOnInit(){
    this.prescriptionService.getAllPrescriptions().subscribe(prescriptionsArray=>{
      this.prescriptions=prescriptionsArray;
    })
  }
  delete(id:number){
    this.prescriptionService.deletePrescriptionsById(id).subscribe(data=>{
      this.prescriptionService.getAllPrescriptions().subscribe(()=>{
      })
    })
  }
}
