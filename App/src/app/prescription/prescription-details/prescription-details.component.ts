import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Prescription } from 'src/app/models/prescription';
import { prescriptionService } from 'src/app/services/prescription.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-prescription-details',
  templateUrl: './prescription-details.component.html',
  styleUrls: ['./prescription-details.component.css']
})
export class PrescriptionDetailsComponent implements OnInit{
  newPrecscreption:Prescription= new Prescription(0,0,0,0,[{name:'',dose:'',type:"tablet",frequency:''}],'','');
  constructor(public prescriptionService:prescriptionService,private activatedRoute:ActivatedRoute,private router:Router){
    
  }
  ngOnInit(){
    this.activatedRoute.params.subscribe(parameters=>{
      this.prescriptionService.getPrescriptionById(parameters['id']).subscribe(PrescriptionObject=>{
        this.newPrecscreption=PrescriptionObject;
        console.log(this.newPrecscreption);
      })
    })
  }
  back(){
    this.router.navigateByUrl('/prescription');
  }
}
