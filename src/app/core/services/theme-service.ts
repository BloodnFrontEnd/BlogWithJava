import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ThemeService {
  private theme = signal<Theme>('light');

  constructor() {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      this.setTheme(savedTheme);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(prefersDark ? 'dark' : 'light');
  }

  public toggleTheme(): void {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private setTheme(theme: Theme): void {
    this.theme.set(theme);
    localStorage.setItem('theme', theme);

    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  public getTheme(): Theme {
    return this.theme();
  }
}

export type Theme = 'light' | 'dark';
