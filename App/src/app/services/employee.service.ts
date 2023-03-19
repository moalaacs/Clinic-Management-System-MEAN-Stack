import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}`).pipe(
      tap(response => console.log('Response from getAllEmployees:', response)),
      catchError(error => {
        console.log('Error retrieving Employees: ', error);
        return throwError('Could not retrieve Employees. Please try again later.');
      })
    );
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.log('Error retrieving Employee: ', error);
        return throwError('Could not retrieve Employee. Please try again later.');
      })
    );
  }



  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}`, employee);
  }

  putEmployeeById(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee);
  }


  patchEmployeeById(id: number,employee: Partial<Employee>): Observable<any> {
    return this.http.patch<Employee>(`${this.baseUrl}/${id}`, employee);
  }

  removeEmployeeById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}