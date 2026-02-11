import { HttpClient } from '@angular/common/http';

export abstract class ApiURLBaseService {
  protected readonly baseUrl = 'http://localhost:8080/api/v1';
  protected constructor(protected http: HttpClient) {}
}
