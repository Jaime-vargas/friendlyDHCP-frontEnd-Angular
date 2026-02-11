import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiURLBaseService} from './api-url-base.service';
import { Observable, catchError, throwError } from 'rxjs';
import {Device} from '../models/Device';
import {DeviceCreateDto} from '../models/DeviceCreateDto';

@Injectable({ providedIn: 'root' })
export class DeviceApiService extends ApiURLBaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Observable<Device[]> {
    return this.http
      .get<Device[]>(`${this.baseUrl}/devices`)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Device> {
    return this.http
      .get<Device>(`${this.baseUrl}/devices/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(dto: DeviceCreateDto): Observable<Device> {
    return this.http
      .post<Device>(`${this.baseUrl}/devices`, dto)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/devices/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(() => error.error);
  }
}
