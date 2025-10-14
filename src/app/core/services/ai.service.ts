import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { QA } from '../models/qa.models';

@Injectable({ providedIn: 'root' })
export class AiService {
  private canned = new Map<string, string>([
    [
      'what is angular',
      'Angular is a frontend framework developed by Google for building web applications.',
    ],
    [
      'what is rxjs',
      'RxJS is a library for reactive programming using Observables.',
    ],
    ['hello', 'Hi! How can I help you today?'],
  ]);

  constructor() {}

  ask(question: string): Observable<QA> {
    const normalized = (question || '').trim().toLowerCase();

    if (!normalized) {
      return throwError(() => new Error('Question is empty')).pipe(delay(300));
    }

    const answer =
      this.canned.get(normalized) ??
      `Mock AI answer for: "${question}". (This is a generated mock response.)`;

    const response: QA = {
      question: question,
      answer,
      createdAt: new Date().toISOString(),
    };

    const randomDelay = 800 + Math.floor(Math.random() * 600);

    return of(response).pipe(delay(randomDelay));
  }
}
