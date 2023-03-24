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



  addDoctor(doctor: Doctor, photo:File): Observable<Doctor> {
    const formData = new FormData();
    if (photo) {
      console.log('photo', photo);
      formData.append('photo', photo);
    }
    Object.entries(doctor).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          Object.entries(item).forEach(([subKey, subValue]) => {
            formData.append(`${key}[${index}].${subKey}`, subValue as string);
          });
        });
      } else if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          formData.append(`${key}.${subKey}`, subValue as string);
        });
      } else {
        formData.append(key, value);
      }
    });

    formData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });

    return this.http.post<Doctor>(`${this.baseUrl}`, formData);
}



  putDoctorById(id: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.baseUrl}/${id}`, doctor);
  }



  patchDoctorById(id: number,doctor: Doctor, photo:File): Observable<Doctor> {
    const formData = new FormData();
    if (photo) {
      formData.append('photo', photo);
    }
    Object.entries(doctor).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          formData.append(`${key}.${subKey}`, subValue as string);
        });
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
