import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl = 'http://localhost:8080/doctor';

  constructor(private http: HttpClient) { }

  getAllDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
  }

  getDoctorById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }



  addDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.baseUrl}`, doctor);
  }

  putDoctorById(id: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.baseUrl}/${id}`, doctor);
  }


  patchDoctorById(id: number,doctor: Partial<Doctor>): Observable<any> {
    return this.http.patch<Doctor>(`${this.baseUrl}/${id}`, doctor);
  }

  removeDoctorById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }}
