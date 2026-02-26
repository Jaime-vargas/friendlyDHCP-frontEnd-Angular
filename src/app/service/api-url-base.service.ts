import { HttpClient } from '@angular/common/http';

export abstract class ApiURLBaseService {
  protected readonly baseUrl  = "/api/v1";
  protected constructor(protected http: HttpClient,) {
  }
}
