import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class UserService<T extends Person> {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // getAllUsers(role: string): Observable<T[]> {
  //   return this.http.get<T[]>(`${this.baseUrl}/${role}`).pipe(
  //     tap(response => console.log(`Response from getAll${role}s:`, response)),
  //     catchError(error => {
  //       console.log(`Error retrieving ${role}s: `, error);
  //       return throwError(`Could not retrieve ${role}s. Please try again later.`);
  //     })
  //   );
  // }

  getAllUsers(role: string, filter?: object, pagination?: object, sorting?: object): Observable<T[]> {
    let url = `${this.baseUrl}/${role}`;
    if (filter) {
      url += `?filter=${JSON.stringify(filter)}`;
    }
    if (pagination) {
      url += `&pagination=${JSON.stringify(pagination)}`;
    }
    if (sorting) {
      url += `&sorting=${JSON.stringify(sorting)}`;
    }
    return this.http.get<T[]>(url).pipe(
      tap(response => console.log(`Response from getAll${role}s:`, response)),
      catchError(error => {
        console.log(`Error retrieving ${role}s: `, error);
        return throwError(`Could not retrieve ${role}s. Please try again later.`);
      })
    );
  }


  getUserById(role: string, id: number): Observable<any> {
    return this.http.get<T>(`${this.baseUrl}/${role}/${id}`).pipe(
      catchError(error => {
        console.log(`Error retrieving ${role}: `, error);
        return throwError(`Could not retrieve ${role}. Please try again later.`);
      })
    );
  }

  addUser(role: string, user: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${role}`, user);
  }

  putUserById(role: string, id: number, user: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${role}/${id}`, user);
  }

  patchUserById(role: string, id: number, user: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${role}/${id}`, user);
  }

  removeUserById(role: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${role}/${id}`);
  }
}
