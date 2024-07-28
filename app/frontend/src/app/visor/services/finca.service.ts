import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FincaService {
  private baseUrl: string = 'http://localhost:1337';

  constructor(private http: HttpClient) {}

  save(body: any) {
    return this.http.post(this.baseUrl, body);
  }
}
