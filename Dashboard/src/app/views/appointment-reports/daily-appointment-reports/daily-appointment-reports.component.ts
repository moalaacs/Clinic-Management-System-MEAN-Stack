import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from '../../../models/appointment-report';
import { AppointmentsReportsService } from '../../../services/appointments-reports.service';

@Component({
  selector: 'app-daily-appointment-reports',
  templateUrl: './daily-appointment-reports.component.html',
  styleUrls: ['./daily-appointment-reports.component.scss']
})
export class DailyAppointmentReportsComponent {
  basicData: any;
  basicOptions: any;
  appointments: Appointment[] = [];
  _8Counter = 0;
  _9Counter = 0;
  _10Counter = 0;
  _11Counter = 0;
  _12Counter = 0;
  _1Counter = 0;
  _2Counter = 0;
  _3Counter = 0;
  _4Counter = 0;
  _5Counter = 0;
  _6Counter = 0;
  _7Counter = 0;
  _8PMCounter = 0;
  _9PMCounter = 0;
  _10PMCounter = 0;

  constructor(public AppointmentsReportsService: AppointmentsReportsService, public router: Router) {
  }

  ngOnInit() {
    this.AppointmentsReportsService.getDailyAppointmentsReports().subscribe(data => {
      this.appointments = data;

      this.appointments.forEach(element => {
        let hour = parseInt(element._time.split(":")[0]);
        switch (hour) {
          case 8: {
            this._8Counter += 1;
            break;
          }
          case 9: {
            this._9Counter += 1;
            break;
          }
          case 10: {
            this._10Counter += 1;
            break;
          }
          case 11: {
            this._11Counter += 1;
            break;
          }
          case 12: {
            this._12Counter += 1;
            break;
          }
          case 1: {
            this._1Counter += 1;
            break;
          }
          case 2: {
            this._2Counter += 1;
            break;
          }
          case 3: {
            this._3Counter += 1;
            break;
          }
          case 4: {
            this._4Counter += 1;
            break;
          }
          case 5: {
            this._5Counter += 1;
            break;
          }
          case 6: {
            this._6Counter += 1;
            break;
          }
          case 7: {
            this._7Counter += 1;
            break;
          }
          case 8: {
            this._8PMCounter += 1;
            break;
          }
          case 9: {
            this._9PMCounter += 1;
            break;
          }
          case 10: {
            this._10PMCounter += 1;
            break;
          }
        }
        console.log(element._time.split(":")[1]);
      });
      this.basicData = {
        labels: ['8 AM', '9 AM', '10 AM',
          '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'],
        datasets: [
          {
            label: 'Appointments',
            data: [this._8Counter, this._9Counter, this._10Counter, this._11Counter, this._12Counter, this._1Counter, this._2Counter, this._3Counter, this._4Counter, this._5Counter, this._6Counter, this._7Counter, this._8PMCounter, this._9PMCounter, this._10PMCounter],
            fill: false,
            tension: 0.4,
            backgroundColor: '#e55353',
            borderColor: '#e55353',
            pointBackgroundColor: 'rgba(151, 187, 205, 1)',
            pointBorderColor: '#fff',
          },
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
