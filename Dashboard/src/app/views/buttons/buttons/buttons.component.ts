import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from '../../../models/appointment-report';
import { AppointmentsReportsService } from '../../../services/appointments-reports.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent {

  states = ['normal', 'active', 'disabled'];
  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
  basicData: any;
  basicOptions: any;
  appointments: Appointment[] = [];
  janCounter = 0;
  febCounter = 0;
  marCounter = 0;
  aprCounter = 0;
  mayCounter = 0;
  junCounter = 0;
  julCounter = 0;
  augCounter = 0;
  sepCounter = 0;
  octCounter = 0;
  novCounter = 0;
  decCounter = 0;

  constructor(public AppointmentsReportsService: AppointmentsReportsService, public router: Router) {
  }

  ngOnInit() {
    this.AppointmentsReportsService.getAllAppointmentsReports().subscribe(data => {
      this.appointments = data;
      this.appointments.forEach(element => {
        let month = parseInt(element._date.split("/")[1]);
        switch (month) {
          case 1: {
            this.janCounter += 1;
            break;
          }
          case 2: {
            this.febCounter += 1;
            break;
          }
          case 3: {
            this.marCounter += 1;
            break;
          }
          case 4: {
            this.aprCounter += 1;
            break;
          }
          case 5: {
            this.mayCounter += 1;
            break;
          }
          case 6: {
            this.junCounter += 1;
            break;
          }
          case 7: {
            this.julCounter += 1;
            break;
          }
          case 8: {
            this.augCounter += 1;
            break;
          }
          case 9: {
            this.sepCounter += 1;
            break;
          }
          case 10: {
            this.octCounter += 1;
            break;
          }
          case 11: {
            this.novCounter += 1;
            break;
          }
          case 12: {
            this.decCounter += 1;
            break;
          }
        }
      });
      this.basicData = {
        labels: ['January', 'February', 'March',
          'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: '2022',
            data: [this.janCounter, this.febCounter, this.marCounter, this.aprCounter, this.mayCounter, this.junCounter, this.julCounter, this.augCounter, this.sepCounter, this.octCounter, this.novCounter, this.decCounter],
            fill: false,
            borderColor: '#177300',
            tension: 0.4,
          },
          // {
          //   label: '2023',
          //   data: [1, 2, 4, 6, 2, 6, 1],
          //   fill: true,
          //   borderColor: '#AA2324',
          //   tension: 0.4,
          // },
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
  }

}
