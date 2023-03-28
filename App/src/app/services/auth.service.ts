import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }
  token: any;
  decodedToken: any;
  helper = new JwtHelperService();
  baseUrl = 'http://localhost:8080';

  registerUser(patient: Patient, photo: File): Observable<Patient> {
    const formData = new FormData();
    if (photo) {
      formData.append('photo', photo);
    }

    Object.entries(patient).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          for (let key2 in value[i]) {
            formData.append(`${key}[${i}][${key2}]`, value[i][key2]);
            console.log(`${key}[${i}][${key2}]`, value[i][key2]);
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

    return this.http.post<Patient>(`${this.baseUrl}/register`, formData);
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
