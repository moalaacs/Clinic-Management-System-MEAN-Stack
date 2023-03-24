import { Component } from '@angular/core';
import { Invoice } from '../../../models/invoice-reports'
import { InvoiceReportsService } from '../../../services/invoice-reports.service';

@Component({
  selector: 'app-all-invoice-reports',
  templateUrl: './all-invoice-reports.component.html',
  styleUrls: ['./all-invoice-reports.component.scss']
})
export class AllInvoiceReportsComponent {
  invoices: Invoice[] = [];
  constructor(public InvoiceReportsService: InvoiceReportsService) {
  }
  ngOnInit() {
    this.InvoiceReportsService.getAllInvoiceReports().subscribe(data => {
      this.invoices = data;
      console.log(data);
    })
  }
}
