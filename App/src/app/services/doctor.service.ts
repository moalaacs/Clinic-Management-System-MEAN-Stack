import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Doctor } from '../models/doctor';
import { isArray } from 'chart.js/dist/helpers/helpers.core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl = 'http://localhost:8080/doctor';

  constructor(private http: HttpClient) { }

  getAllDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}`).pipe(
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


  addDoctor(doctor: Doctor, photo: File): Observable<Doctor> {
    const formData = new FormData();
    if (photo) {
      formData.append('photo', photo);
    }
    Object.entries(doctor).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          for (let key2 in value[i]) {
            formData.append(`${key}[${i}][${key2}]`, value[i][key2]);
          }
        }
      } else if (typeof value === 'object') {
        for (let key2 in value) {
          formData.append(`${key}[${key2}]`, value[key2]);
        }
      } else {
        formData.append(key, value);
      }
    });
    return this.http.post<Doctor>(`${this.baseUrl}`, formData);
  }

  putDoctorById(id: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.baseUrl}/${id}`, doctor);
  }



  patchDoctorById(id: number, doctor: Doctor, photo: File): Observable<Doctor> {
    const formData = new FormData();
    if (photo) {
      formData.append('photo', photo);
    }
    Object.entries(doctor).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          for (let key2 in value[i]) {
            formData.append(`${key}[${i}][${key2}]`, value[i][key2]);
          }
        }
      } else if (typeof value === 'object') {
        for (let key2 in value) {
          formData.append(`${key}[${key2}]`, value[key2]);
        }
      } else {
        formData.append(key, value);
      }
    });

    return this.http.patch<Doctor>(`${this.baseUrl}/${id}`, formData);
  }

  removeDoctorById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
