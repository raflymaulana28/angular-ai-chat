

import { Injectable } from '@angular/core';
import { AiApiItem } from '../models/qa.models';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storageKey = 'ai_chat_history';

  constructor() {}

  getHistory(): AiApiItem[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(raw) as AiApiItem[]) : [];
    } catch {
      return [];
    }
  }

  setHistory(items: AiApiItem[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save history', e);
    }
  }
}
