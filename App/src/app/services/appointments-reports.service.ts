import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment-report';
@Injectable({
  providedIn: 'root'
})
export class AppointmentsReportsService {
  constructor(public http: HttpClient) { }
  baseUrl: string = "http://localhost:8080/appointmentReports";

  getAllAppointmentsReports() {
    return this.http.get<Appointment[]>(this.baseUrl);
  }
}
