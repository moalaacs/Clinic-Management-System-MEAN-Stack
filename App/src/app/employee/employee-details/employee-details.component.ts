import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: any = null;
  profilePic: string = "";

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeService.getEmployeeById(id).pipe(
      map(response => response.data)).subscribe(data => {
      this.employee = data
      console.log(this.employee)
      this.profilePic = "http://localhost:8080/" + this.employee.image
    });
  }
  goBack(): void {
    this.location.back();
  }
}
