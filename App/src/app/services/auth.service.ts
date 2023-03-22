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
    let dob = patient.dateOfBirth?.split('-');
    patient.dateOfBirth = dob[2] + '/' + dob[1] + '/' + dob[0];
    patient.image=photo;
    console.log(patient);
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
  getEmail() {
    this.token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : '';
    this.decodedToken = this.helper.decodeToken(this.token);
    return this.decodedToken.email;
  }
  getToken(){
    return this.token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : '';
  }
}
