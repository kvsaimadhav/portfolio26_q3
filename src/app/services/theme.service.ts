import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private key = 'portfolio-theme';

  initTheme() {
    const saved = localStorage.getItem(this.key) || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(this.key, next);
  }

  isDark(): boolean {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }
}
