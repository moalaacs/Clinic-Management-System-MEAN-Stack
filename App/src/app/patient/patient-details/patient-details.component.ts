import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  patient: any = null;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.patientService.getPatientById(id).pipe(
      map(response => response.data)).subscribe(data => {
      this.patient = data
    });
  }
  goBack(): void {
    this.router.navigate(['/patient']);
  }

}
