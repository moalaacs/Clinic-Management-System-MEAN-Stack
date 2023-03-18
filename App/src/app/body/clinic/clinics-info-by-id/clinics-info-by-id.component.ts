import { Component,OnInit } from '@angular/core';
import { ClinicService } from 'src/app/service/clinic.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-clinics-info-by-id',
  templateUrl: './clinics-info-by-id.component.html',
  styleUrls: ['./clinics-info-by-id.component.css']
})
export class ClinicsInfoByIdComponent {
  clinic:{_contactNumber:string,_address:{street:string,city:string,country:string,zipCode:number},_weeklySchedule:{day:string,start:string,end:string}[],_doctors:Object[],_specilization:string};
  constructor(private clinicService:ClinicService,private rotue:ActivatedRoute){
    this.clinic={_contactNumber:"",_address:{street:"",city:"",country:"",zipCode:0},_weeklySchedule:[],_doctors:[],_specilization:""};
    this.clinicService.getPublicClinicInfoById(this.rotue.snapshot.params["id"]).subscribe(data=>this.clinic=data);
  }
}
