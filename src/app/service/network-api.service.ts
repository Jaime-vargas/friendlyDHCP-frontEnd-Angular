import {computed, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiURLBaseService} from './api-url-base.service';
import {catchError, Observable, throwError} from 'rxjs';
import {Network} from '../models/Network';
import {NetworkCreateDto} from '../models/NetworkCreateDto';

@Injectable({ providedIn: 'root' })
export class NetworkApiService extends ApiURLBaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Observable<Network[]> {
    return this.http
      .get<Network[]>(`${this.baseUrl}/networks`)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Network> {
    return this.http
      .get<Network>(`${this.baseUrl}/networks/${id}`)
      .pipe(catchError(this.handleError));
  }

  save(dto: NetworkCreateDto): Observable<Network> {
    return this.http
      .post<Network>(`${this.baseUrl}/networks`, dto)
      .pipe(catchError(this.handleError));
  }

  update(id: number, dto: NetworkCreateDto): Observable<Network> {
    return this.http.put<Network>(`${this.baseUrl}/networks/${id}`, dto)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(() => error.error);
  }
}
