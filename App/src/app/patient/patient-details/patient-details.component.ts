import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { PatientService } from 'src/app/services/patient.service';

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
