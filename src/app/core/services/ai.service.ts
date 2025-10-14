import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AiService {
  private API_URL = 'https://68ee8211df2025af7803f236.mockapi.io/api/v1/ai/ask';

  constructor(private http: HttpClient) {}

  ask(question: string) {
    return this.http.get<any[]>(this.API_URL).pipe(
      map((data) => {
        const found = data.find((item) =>
          item.question.toLowerCase().includes(question.toLowerCase())
        );
        if (found) return { answer: found.answer };
        return { answer: "I'm not sure, but I can learn more about that!" };
      })
    );
  }
}
