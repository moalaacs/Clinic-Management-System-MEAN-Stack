import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }
  token: any;
  decodedToken: any;
  helper = new JwtHelperService();
  baseUrl = 'http://localhost:8080';

  registerUser(patient: any, photo: File) {
    let dob = patient.dateOfBirth;
    const date = new Date(dob);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    patient.dateOfBirth= formattedDate;
    patient.photo = photo;
    console.log(patient);
    alert("Hello")
    return this.http.post<Patient>(`${this.baseUrl}/register`, patient);
  }

  loginUser(userData: any) {
    return this.http.post(`${this.baseUrl}/login`, userData);
  }

  isLoggedIn() {
    return sessionStorage.getItem('token') != null;

  }
  getRole() {
    this.token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : '';
    this.decodedToken = this.helper.decodeToken(this.token);
    return this.decodedToken.role;
  }
  getID() {
    this.token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : '';
    this.decodedToken = this.helper.decodeToken(this.token);
    return this.decodedToken.id;
  }
  getEmail() {
    this.token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : '';
    this.decodedToken = this.helper.decodeToken(this.token);
    return this.decodedToken.email;
  }
  getToken() {
    return this.token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : '';
  }
}
