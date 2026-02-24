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

  update(settings: Settings): Observable<Settings> {
    return this.http.post<Settings>(`${this.baseUrl}/configuration`, settings)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(() => error.error);
  }
}
