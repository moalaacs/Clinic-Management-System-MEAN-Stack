import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Patient } from '../models/patient';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:8080';

  RegisterUser(patient: any, photo: File) {
    let dob = patient.dateOfBirth?.split('-');
    patient.dateOfBirth = dob[2] + '/' + dob[1] + '/' + dob[0];
    patient.photo = photo;
    return this.http.post<Patient>(`${this.baseUrl}/register`, patient);
  }

  LoginUser(userData: any) {
    return this.http.post(`${this.baseUrl}/login`, userData);
  }

  isLoggedIn() {
    return sessionStorage.getItem('email') != null;
  }
  getRole() {
    return sessionStorage.getItem('role') != null
      ? sessionStorage.getItem('role')?.toString()
      : '';
  }
}
