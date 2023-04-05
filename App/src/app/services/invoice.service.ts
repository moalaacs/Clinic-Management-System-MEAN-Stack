import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
 /* Base URL */
 baseurl = "http://localhost:8080/invoice/";

 constructor(public http: HttpClient) { }

 /* Get All Invoices */
 getAllInvoices() {
   return this.http.get<Invoice[]>(this.baseurl);
 }
 /* Get Invoice by ID */
 getInvoiceById(id: string) {
   return this.http.get<Invoice>(this.baseurl + id);
 }
 /* Add New Invoice */
 addInvoice(invoice: any) {
   return this.http.post<Invoice>(this.baseurl, invoice);
 }
 /* Delete Invoice by ID */
 deleteInvoiceById(id: string) {
   return this.http.delete<Invoice>(this.baseurl + id);
 }
 /* Update Invoice by ID */
 updateInvoice(id:number,invoice: any) {
   return this.http.patch<Invoice>(`${this.baseurl}${id}`, invoice);
 }

}
