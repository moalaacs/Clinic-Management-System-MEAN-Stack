import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';
import { DeleteConfirmationComponent } from 'src/app/shared/delete-confirmation.component';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  constructor(
    public invoiceService: InvoiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.invoiceService
      .getAllInvoices()
      .subscribe((invoicesArray) => {
        this.invoices = invoicesArray;
      });
  }
  delete(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.invoiceService.deleteInvoiceById(id).subscribe(() => {
          const index = this.invoices.findIndex((p) => p._id === id);
          if (index >= 0) {
            this.invoices.splice(index, 1);
            this.snackBar.open('invoice deleted', 'Close', {
              duration: 2000,
            });
          }
        });
      }
    });
  }
}
