import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prescription } from '../models/prescription';


@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  /* Base URL */
  baseurl = "http://localhost:8080/prescription/";

  constructor(public http: HttpClient) { }

  /* Get All Prescription */
  getAllPrescription() {
    return this.http.get<Prescription[]>(this.baseurl);
  }
  /* Get Prescription by ID */
  getPrescriptionById(id: number) {
    return this.http.get<Prescription>(this.baseurl + id);
  }
  /* Add New Prescription */
  addPrescription(prescription: Prescription) {
    return this.http.post<Prescription>(this.baseurl, prescription);
  }
  /* Delete Prescription by ID */
  deletePrescriptionById(id: number) {
    return this.http.delete<Prescription>(this.baseurl + id);
  }
  /* Update Prescription by ID */
  updatePrescription(prescription: Prescription) {
    return this.http.put<Prescription>(this.baseurl + prescription._id, prescription);
  }
}
