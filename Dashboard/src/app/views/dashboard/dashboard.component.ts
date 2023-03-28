import { Component } from '@angular/core';
import { Appointment } from '../../models/appointment-report';
import { AppointmentsReportsService } from '../../services/appointments-reports.service';

import { Invoice } from 'src/app/models/invoice-reports';
import { InvoiceReportsService } from 'src/app/services/invoice-reports.service';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { clinic } from 'src/app/models/clinic';
import { ClinicService } from 'src/app/services/clinic.service';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  appointments: Appointment[] = [];
  invoices: Invoice[] = [];
  patients: Patient[] = [];
  doctors: Doctor[] = [];
  employees: Employee[] = [];
  clinics: clinic[] = [];
  income = 0;
  basicData: any;
  basicOptions: any;
  doughnutData: any;
  polarData: any;

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

  constructor(public AppointmentsReportsService: AppointmentsReportsService,
    public InvoiceReportsService: InvoiceReportsService,
    public PatientService: PatientService, public DoctorService: DoctorService,
    public EmployeeService: EmployeeService,
    public ClinicService: ClinicService) {
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

      this.PatientService.getAllPatients().subscribe(data => {
        this.patients = data.data;
      })

      this.DoctorService.getAllDoctors().subscribe(data => {
        this.doctors = data.data;
      })

      this.EmployeeService.getAllEmployees().subscribe(data => {
        this.employees = data.data;
        this.doughnutData = {
          labels: [
            'Doctors',
            'Employees',
            'Patients',
          ],
          datasets: [
            {
              data: [this.doctors.length, this.employees.length, this.patients.length],
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
              ],
            }],
        };
      })

      this.ClinicService.getClinics().subscribe(data => {
        this.clinics = data.data;
        this.polarData = {
          datasets: [
            {
              data: [
                this.clinics.length,
                this.doctors.length,
                this.patients.length,
                this.appointments.length,
                this.invoices.length
              ],
              backgroundColor: [
                '#FF6384',
                '#4BC0C0',
                '#FFCE56',
                '#36A2EB',
                '#E7E9ED',
              ],
              label: ''
            }],
          labels: [
            'Clinics',
            'Doctors',
            'Patients',
            'Appointments',
            'Invoices',
          ],
        };
      })
    })
  }
}
