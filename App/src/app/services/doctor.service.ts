import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl = 'http://localhost:8080/doctor';

  constructor(private http: HttpClient) { }

  getAllDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}`).pipe(
      tap(response => console.log('Response from getAllDoctors:', response)),
      catchError(error => {
        console.log('Error retrieving Doctors: ', error);
        return throwError('Could not retrieve Doctors. Please try again later.');
      })
    );
  }

  getDoctorById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.log('Error retrieving Doctor: ', error);
        return throwError('Could not retrieve Doctor. Please try again later.');
      })
    );
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