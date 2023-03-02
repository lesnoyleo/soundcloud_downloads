import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadDataService {
  constructor(private httpClient: HttpClient) {}

  getTextFromTxt(path: string): Observable<string> {
    return this.httpClient.get<string>(`assets/${path}.txt`, {
      responseType: 'text' as 'json',
    });
  }
}
