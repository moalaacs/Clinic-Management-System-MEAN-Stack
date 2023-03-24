import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'http://localhost:8080/patient';

  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<any> {
    return this.http.get(`${this.baseUrl}`).pipe(
      tap(response => console.log('Response from getAllPatients:', response)),
      catchError(error => {
        console.log('Error retrieving patients: ', error);
        return throwError('Could not retrieve patients. Please try again later.');
      })
    );
  }

  getPatientById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.log('Error retrieving patient: ', error);
        return throwError('Could not retrieve patient. Please try again later.');
      })
    );
  }



  addPatient(patient: Patient, photo: File): Observable<Patient> {
    return this.http.post<Patient>(`${this.baseUrl}`, patient);
  }

  putPatientById(id: number, patient: Patient, photo: File): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/${id}`, patient);
  }


  patchPatientById(id: number,patient: Partial<Patient>, photo: File): Observable<any> {
    return this.http.patch<Patient>(`${this.baseUrl}/${id}`, patient);
  }

  removePatientById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
