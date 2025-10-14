import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface AiResponse {
  answer: string;
}

export interface AiApiItem {
  id?: string;
  question: string;
  answer?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private readonly API_URL =
    'https://68ee8211df2025af7803f236.mockapi.io/api/v1/ai/ask';

  constructor(private http: HttpClient) {}

  ask(question: string) {
    return this.http.get<any[]>(this.API_URL).pipe(
      map((data) => {
        const found = data.find((item) =>
          item.question.toLowerCase().includes(question.toLowerCase())
        );
        return found
          ? { answer: found.answer }
          : {
              answer: `Mock AI answer for: "${question}". (This is a generated mock response.)`,
            };
      })
    );
  }
}
