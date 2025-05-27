import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';

import * as tr from './tr.json';
import * as en from './en.json';
import * as de from './de.json';

const defaultLocale = 'en';
const isBrowser = typeof window !== 'undefined';

export function setupI18n() {
  addMessages('en', en);
  addMessages('tr', tr);
  addMessages('de', de);

  init({
    fallbackLocale: defaultLocale,
    initialLocale: isBrowser 
      ? window.localStorage.getItem('lang') || getLocaleFromNavigator() || defaultLocale 
      : defaultLocale,
  });
}

export function setLanguage(locale: string) {
  if (isBrowser) {
    window.localStorage.setItem('lang', locale);
  }
  init({
    fallbackLocale: defaultLocale,
    initialLocale: locale,
  });
}