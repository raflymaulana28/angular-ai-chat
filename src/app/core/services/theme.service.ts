import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();

  constructor() {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) this.darkMode.next(saved === 'true');
    this.applyTheme();
  }

  toggleTheme() {
    const newMode = !this.darkMode.value;
    this.darkMode.next(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    this.applyTheme();
  }

  private applyTheme() {
    const body = document.body;
    if (this.darkMode.value) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }

  get isDark(): boolean {
    return this.darkMode.value;
  }
}
