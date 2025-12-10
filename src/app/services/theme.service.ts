import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';
export type Lang = 'en' | 'ar';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly theme = signal<Theme>('light');
  readonly lang = signal<Lang>('en');

  constructor() {
    // Initialize from local storage or default
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      this.theme.set(savedTheme);
    }

    const savedLang = localStorage.getItem('lang') as Lang;
    if (savedLang) {
      this.lang.set(savedLang);
    }

    // Effect to update DOM when theme changes
    effect(() => {
      const currentTheme = this.theme();
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
    });

    // Effect to update DOM when lang changes
    effect(() => {
      const currentLang = this.lang();
      document.documentElement.setAttribute('lang', currentLang);
      document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
      localStorage.setItem('lang', currentLang);
    });
  }

  toggleTheme() {
    this.theme.update(t => t === 'light' ? 'dark' : 'light');
  }

  toggleLang() {
    this.lang.update(l => l === 'en' ? 'ar' : 'en');
  }

  setTheme(theme: Theme) {
    this.theme.set(theme);
  }

  setLang(lang: Lang) {
    this.lang.set(lang);
  }
}
