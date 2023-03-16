import { Component,OnInit } from '@angular/core';
import { ClinicService } from 'src/app/service/clinic.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services:{name:string,cost:number}[];
  speciallity:any;
  constructor(private clinicService:ClinicService,private rotue:ActivatedRoute){
    this.services=[];
    this.speciallity=this.rotue.parent?.snapshot.params["speciallity"];
  }
  ngOnInit() {
    this.clinicService.getPublicServicesBySpeciality(this.speciallity).subscribe(data=>this.services=data);
  }
}
