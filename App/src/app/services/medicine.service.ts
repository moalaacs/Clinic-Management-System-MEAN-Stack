import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicine } from '../models/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  /* Base URL */
  baseurl = "http://localhost:8080/medicine/";

  constructor(public http: HttpClient) { }

  /* Get All Medicine */
  getAllMedicine() {
    return this.http.get<Medicine[]>(this.baseurl);
  }
  /* Get Medicine by ID */
  getMedicineById(id: number) {
    return this.http.get<Medicine[]>(this.baseurl + id);
  }
  /* Add New Medicine */
  addMedicine(medicine: Medicine) {
    return this.http.post<Medicine>(this.baseurl, medicine);
  }
  /* Delete Medicine by ID */
  deleteMedicineById(id: number) {
    return this.http.delete<Medicine>(this.baseurl + id);
  }
  /* Update Medicine by ID */
  updateMedicine(medicine: Medicine) {
    return this.http.put<Medicine>(this.baseurl + medicine._id, medicine);
  }
}
