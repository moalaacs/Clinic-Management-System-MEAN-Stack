import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { clinicServicesClass } from '../class/clinicServicesClass';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  authorizedURL:string;
  baseURL:string;
  constructor(private http:HttpClient) {
    this.baseURL="http://localhost:8080"
    this.authorizedURL="/clinic"
   }
  getPublicServicesBySpeciality(speciality:string){
    return this.http.get<{name:string,cost:number}[]>(this.baseURL+`/clinicservice/${speciality}`);
  } //Done
  getPublicClinicInfoById (id:number){
    return this.http.get<{_contactNumber:string,_address:{street:string,city:string,country:string,zipCode:number},_weeklySchedule:{day:string,start:string,end:string}[],_doctors:Object[],_specilization:string}>(this.baseURL+`/clinicsinfo/${id}`);
  }
  getPublicClinicsBySpeciality (speciality:string){
    return this.http.get<{_contactNumber:string,_address:{street:string,city:string,country:string,zipCode:number},_weeklySchedule:{day:string,start:string,end:string}[]}[]>(this.baseURL+`/clinicsspecilization/${speciality}`);
  } //Done
  getPublicAvailableSpecilization(){
    return this.http.get<string[]>(this.baseURL+"/availablespecilizations");
  } //Done
}
