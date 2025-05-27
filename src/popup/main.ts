import './styles.css';
import App from './Popup.svelte';
import { setupI18n } from '../lib/i18n';
import { theme } from '../lib/stores/theme';

// i18n kurulumunu yap
setupI18n();

// Tema başlatma
theme.subscribe(value => {
  document.documentElement.setAttribute('data-theme', value);
});

const app = new App({
  target: document.getElementById('app') as HTMLElement,
});

export default app;