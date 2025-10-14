import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AiApiItem, AiResponse } from '../models/qa.models';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private readonly API_URL =
    'https://68ee8211df2025af7803f236.mockapi.io/api/v1/ai/ask';

  constructor(private http: HttpClient) {}

  ask(question: string): Observable<AiResponse> {
    return this.http.get<AiApiItem[]>(this.API_URL).pipe(
      map((data) => {
        const found = data.find(
          (item) =>
            item.question.trim().toLowerCase() === question.trim().toLowerCase()
        );
        return found
          ? { answer: found.answer || '' }
          : {
              answer: `Mock AI answer for: "${question}". (This is a generated mock response.)`,
            };
      }),
      catchError((err) =>
        of({
          answer:
            '⚠️ Unable to reach AI service — showing mock fallback answer.',
        })
      )
    );
  }
}
