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
      catchError(error => {
        console.log('Error retrieving Employees: ', error);
        return throwError('Could not retrieve Employees. Please try again later.');
      })
    );
  }

  getAllEmployees2(role: string, query?: string, page?:number , limit?: number, sortBy?: string, order?:"asc" | "desc"): Observable<any>{
    let url = `${this.baseUrl}?page=${page}`;
    if (query) {
      url += `&${query}`;
    }
    if (limit){
      url += `&limit=${limit}`;
    }
    if (sortBy){
      url += `&sortBy=${sortBy}`;
    }
    if (order){
      url += `&order=${order}`;
    }


    return this.http.get<any>(url).pipe(
      catchError(error => {
        return throwError(`Could not retrieve ${role}s. Please try again later.`);
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



  addEmployee(employee: Employee,  photo:File ): Observable<Employee> {

    const formData = new FormData();
    if (photo) {
      formData.append('photo', photo);
    }

    Object.entries(employee).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          for (let key2 in value[i]) {
            formData.append(`${key}[${i}][${key2}]`, value[i][key2]);
            console.log(`${key}[${i}][${key2}]`, value[i][key2]);
          }
        }
      } else if (typeof value === 'object') {
        for (let key2 in value) {
          formData.append(`${key}[${key2}]`, value[key2]);
        }
      } else {
        formData.append(key, value);
      }
    });

    return this.http.post<Employee>(`${this.baseUrl}`, formData);
  }

  putEmployeeById(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee);
  }


  patchEmployeeById(id: number,employee: Employee, photo: File): Observable<Employee> {
    const formData = new FormData();
    if (photo) {
      formData.append('photo', photo);
    }

    Object.entries(employee).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          for (let key2 in value[i]) {
            formData.append(`${key}[${i}][${key2}]`, value[i][key2]);
          }
        }
      } else if (typeof value === 'object') {
        for (let key2 in value) {
          formData.append(`${key}[${key2}]`, value[key2]);
        }
      } else {
        formData.append(key, value);
      }
    });



    return this.http.patch<Employee>(`${this.baseUrl}/${id}`, formData);
  }

  removeEmployeeById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
