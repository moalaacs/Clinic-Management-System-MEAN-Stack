import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../models/invoice-reports';

@Injectable({
  providedIn: 'root'
})
export class InvoiceReportsService {

  constructor(public http: HttpClient) { }
  baseUrl: string = "http://localhost:8080/invoiceReports";

  getAllInvoiceReports() {
    return this.http.get<Invoice[]>(this.baseUrl);
  }
  getDailyInvoiceReports() {
    return this.http.get<Invoice[]>(this.baseUrl + "/daily");
  }
}
