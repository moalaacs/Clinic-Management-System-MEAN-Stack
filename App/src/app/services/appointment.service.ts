import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  /* Base URL */
  baseurl = "http://localhost:8080/appointment/";

  constructor(public http: HttpClient) { }

  /* Get All appointment */
  getAllAppointment() {
    return this.http.get<Appointment[]>(this.baseurl);
  }
  /* Get Appointment by ID */
  getAppointmentById(id: number) {
    return this.http.get<Appointment[]>(this.baseurl + id);
  }
  /* Add New Appointment */
  addAppointment(appointment: Appointment) {
    return this.http.post<Appointment>(this.baseurl, appointment);
  }
  /* Delete Appointment by ID */
  deleteAppointmentById(id: string) {
    return this.http.delete<Appointment>(this.baseurl + id);
  }
  /* Update Appointment by ID */
  updateAppointment(appointment: Appointment) {
    return this.http.put<Appointment>(this.baseurl + appointment._id, appointment);
  }

}
