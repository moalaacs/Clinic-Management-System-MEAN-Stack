import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { clinic } from '../models/clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  authorizedURL: string;
  baseURL: string;
  constructor(private http: HttpClient) {
    this.baseURL = "http://localhost:8080"
    this.authorizedURL = "/clinic"
  }
  getPublicServicesBySpeciality(speciality: string) {
    return this.http.get<{ name: string, cost: number }[]>(this.baseURL + `/clinicservice/${speciality}`);
  } //Done
  getPublicClinicInfoById(id: number) {
    return this.http.get<clinic>(this.baseURL + `/clinicsinfo/${id}`);
  } //Done
  getClinics() {
    return this.http.get<clinic[]>(this.baseURL + this.authorizedURL);
  } //Done
  getPublicAvailableSpecilization() {
    return this.http.get<string[]>(this.baseURL + "/availablespecilizations");
  } //Done
  addClinic(body: Object) {
    console.log(body);
    return this.http.post<Object>(this.baseURL + this.authorizedURL, body);
  }
  deleteClinicById(id: number) {
    return this.http.delete<void>(`${this.baseURL}${this.authorizedURL}/${id}`);
  }
  getClinicsBySpecilization(speciality: string) {
    return this.http.get<clinic[]>(`${this.baseURL}/clinicsspecilization/${speciality}`);
  }

  patchClinicById(id: number, body: Partial<clinic>) {
    return this.http.patch<clinic>(this.baseURL + this.authorizedURL + `/${id}`, body);
  }
  getClinicById(id: number) {
    return this.http.get<{ clinic: clinic }>(this.baseURL + this.authorizedURL + `/${id}`);
  }
}
