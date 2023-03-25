import { Component } from '@angular/core';
import { Appointment } from '../../models/appointment-report';
import { AppointmentsReportsService } from '../../services/appointments-reports.service';

import { Invoice } from '../../models/invoice-reports';
import { InvoiceReportsService } from '../../services/invoice-reports.service';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  appointments: Appointment[] = [];
  invoices: Invoice[] = [];
  income = 0;
  basicData: any;
  basicOptions: any;

  aJanCounter = 0;
  aFebCounter = 0;
  aMarCounter = 0;
  aAprCounter = 0;
  aMayCounter = 0;
  aJunCounter = 0;
  aJulCounter = 0;
  aAugCounter = 0;
  aSepCounter = 0;
  aOctCounter = 0;
  aNovCounter = 0;
  aDecCounter = 0;

  iJanCounter = 0;
  iFebCounter = 0;
  iMarCounter = 0;
  iAprCounter = 0;
  iMayCounter = 0;
  iJunCounter = 0;
  iJulCounter = 0;
  iAugCounter = 0;
  iSepCounter = 0;
  iOctCounter = 0;
  iNovCounter = 0;
  iDecCounter = 0;

  constructor(public AppointmentsReportsService: AppointmentsReportsService, public InvoiceReportsService: InvoiceReportsService) {
  }

  ngOnInit() {
    this.AppointmentsReportsService.getAllAppointmentsReports().subscribe(data => {
      this.appointments = data;

      this.appointments.forEach(element => {
        let month = parseInt(element._date.split("/")[1]);
        switch (month) {
          case 1: {
            this.aJanCounter += 1;
            break;
          }
          case 2: {
            this.aFebCounter += 1;
            break;
          }
          case 3: {
            this.aMarCounter += 1;
            break;
          }
          case 4: {
            this.aAprCounter += 1;
            break;
          }
          case 5: {
            this.aMayCounter += 1;
            break;
          }
          case 6: {
            this.aJunCounter += 1;
            break;
          }
          case 7: {
            this.aJulCounter += 1;
            break;
          }
          case 8: {
            this.aAugCounter += 1;
            break;
          }
          case 9: {
            this.aSepCounter += 1;
            break;
          }
          case 10: {
            this.aOctCounter += 1;
            break;
          }
          case 11: {
            this.aNovCounter += 1;
            break;
          }
          case 12: {
            this.aDecCounter += 1;
            break;
          }
        }
      });

      this.InvoiceReportsService.getAllInvoiceReports().subscribe(data => {
        this.invoices = data;
        this.invoices.forEach(element => {
          this.income += element.paid;
          let month = parseInt(element.date.split("/")[1]);
          console.log(month);
          switch (month) {
            case 1: {
              this.iJanCounter += 1;
              break;
            }
            case 2: {
              this.iFebCounter += 1;
              break;
            }
            case 3: {
              this.iMarCounter += 1;
              break;
            }
            case 4: {
              this.iAprCounter += 1;
              break;
            }
            case 5: {
              this.iMayCounter += 1;
              break;
            }
            case 6: {
              this.iJunCounter += 1;
              break;
            }
            case 7: {
              this.iJulCounter += 1;
              break;
            }
            case 8: {
              this.iAugCounter += 1;
              break;
            }
            case 9: {
              this.iSepCounter += 1;
              break;
            }
            case 10: {
              this.iOctCounter += 1;
              break;
            }
            case 11: {
              this.iNovCounter += 1;
              break;
            }
            case 12: {
              this.iDecCounter += 1;
              break;
            }
          }
        });

        this.basicData = {
          labels: ['January', 'February', 'March',
            'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Appointments',
              data: [this.aJanCounter, this.aFebCounter, this.aMarCounter, this.aAprCounter, this.aMayCounter, this.aJunCounter, this.aJulCounter, this.aAugCounter, this.aSepCounter, this.aOctCounter, this.aNovCounter, this.aDecCounter],
              fill: false,
              tension: 0.4,
              backgroundColor: '#e55353',
              borderColor: '#e55353',
              pointBackgroundColor: 'rgba(151, 187, 205, 1)',
              pointBorderColor: '#fff',
            }, {
              label: 'Invoices',
              data: [this.iJanCounter, this.iFebCounter, this.iMarCounter, this.iAprCounter, this.iMayCounter, this.iJunCounter, this.iJulCounter, this.iAugCounter, this.iSepCounter, this.iOctCounter, this.iNovCounter, this.iDecCounter],
              fill: false,
              tension: 0.4,
              backgroundColor: '#321fdb',
              borderColor: '#321fdb',
              pointBackgroundColor: 'rgba(151, 187, 205, 1)',
              pointBorderColor: '#fff',
            }
          ],
        };
        this.basicOptions = {
          title: {
            display: true,
            text: 'Article Views',
            fontSize: 32,
            position: 'top',
          },
          scales: {
            x: {
              ticks: {
                color: '#495057',
              },
              grid: {
                color: '#ebedef',
              },
            },
            y: {
              ticks: {
                color: '#495057',
              },
              grid: {
                color: '#ebedef',
              },
            },
          },
        };
      })


    })
  }
}
