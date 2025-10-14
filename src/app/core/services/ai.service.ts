import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private API_URL = 'https://68ee8211df2025af7803f236.mockapi.io/api/v1/ai/ask';

  constructor(private http: HttpClient) {}

  ask(question: string) {
    return this.http.post<{ answer?: string }>(this.API_URL, { question }).pipe(
      map((res) => ({
        answer:
          res?.answer?.trim() ||
          `Mock AI answer for: "${question}". (This is a generated mock response.)`,
      })),
      catchError(() =>
        of({
          answer:
            '⚠️ Unable to reach AI service — showing mock fallback answer.',
        })
      )
    );
  }
}
