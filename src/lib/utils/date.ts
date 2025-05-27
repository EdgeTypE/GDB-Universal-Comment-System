import { get } from 'svelte/store';
import { locale } from 'svelte-i18n';

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const currentLocale = get(locale) || 'en';
  
  // Tarih formatı için Intl.DateTimeFormat kullanıyoruz
  const formatter = new Intl.DateTimeFormat(currentLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  try {
    return formatter.format(date);
  } catch (error) {
    // Geçersiz dil kodu durumunda varsayılan olarak İngilizce kullan
    const defaultFormatter = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    return defaultFormatter.format(date);
  }
};