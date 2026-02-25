import {computed, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiURLBaseService} from './api-url-base.service';
import {catchError, Observable, throwError} from 'rxjs';
import {Settings} from '../models/settings';


@Injectable({ providedIn: 'root' })
export class ConfigApiService extends ApiURLBaseService {

  constructor(http: HttpClient,) {
    super(http);
  }

  get(): Observable<Settings> {
    return this.http
      .get<Settings>(`${this.baseUrl}/configuration`)
      .pipe(catchError(this.handleError));
  }

  apply(): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/configuration/apply`,{})
      .pipe(catchError(this.handleError));
  }

  update(settings: Settings): Observable<Settings> {
    return this.http.post<Settings>(`${this.baseUrl}/configuration`, settings)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {

    const message =
      error?.error?.message ||   // backend JSON
      error?.error ||            // backend texto plano
      error?.message ||          // Angular HttpErrorResponse
      `Error HTTP ${error.status}`;

    return throwError(() => new Error(message));
  }
}
