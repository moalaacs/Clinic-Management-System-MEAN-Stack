import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // Patient-related services
  getAllPatients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/patient`);
  }

  getPatientById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/patient/${id}`);
  }

  addPatient(patient: Patient, photo: File): Observable<Patient> {
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('data', JSON.stringify(patient));
    return this.http.post<Patient>(`${this.baseUrl}/patient`, formData);
  }

  putPatientById(id: number, patient: Patient, photo: File): Observable<Patient> {
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('data', JSON.stringify(patient));
    return this.http.put<Patient>(`${this.baseUrl}/patient/${id}`, formData);
  }

  patchPatientById(id: number, patient: Partial<Patient>, photo: File): Observable<Patient> {
    const formData = new FormData();
    if (photo) {
      formData.append('photo', photo);
    }
    formData.append('data', JSON.stringify(patient));
    return this.http.patch<Patient>(`${this.baseUrl}/patient/${id}`, formData);
  }

  removePatientById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/patient/${id}`);
  }
}
