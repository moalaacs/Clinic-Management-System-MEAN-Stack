import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
private baseUrl = 'http://localhost:8080/pay/';

constructor(private http: HttpClient) { }

Pay(payment: Object,id:string) {
  return this.http.post<Payment>(this.baseUrl+id,payment);
}

}
