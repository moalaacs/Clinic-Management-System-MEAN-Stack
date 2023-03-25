import { Component } from '@angular/core';
import { Invoice } from '../../../models/invoice-reports'
import { InvoiceReportsService } from '../../../services/invoice-reports.service';

@Component({
  selector: 'app-daily-invoice-reports',
  templateUrl: './daily-invoice-reports.component.html',
  styleUrls: ['./daily-invoice-reports.component.scss']
})
export class DailyInvoiceReportsComponent {
  invoices: Invoice[] = [];
  constructor(public InvoiceReportsService: InvoiceReportsService) {
  }
  ngOnInit() {
    this.InvoiceReportsService.getDailyInvoiceReports().subscribe(data => {
      this.invoices = data;
    })
  }
}
