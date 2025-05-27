import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

// localStorage'dan tema tercihini al veya sistem temasını kullan
const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  
  const storedTheme = localStorage.getItem('theme') as Theme;
  if (storedTheme) return storedTheme;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const theme = writable<Theme>(getInitialTheme());

// Tema değiştiğinde localStorage'a kaydet ve html data-theme özelliğini güncelle
theme.subscribe((value) => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('theme', value);
  document.documentElement.setAttribute('data-theme', value);
});