<script lang="ts">
  import { locale, _ } from 'svelte-i18n';
  import { setLanguage } from '../i18n';

  const languages = [
    { code: 'tr', name: 'Türkçe' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' }
  ];
</script>

<div class="dropdown dropdown-end">
  <button class="btn btn-ghost btn-sm" aria-haspopup="true" aria-expanded="false">
    {$_('languages.' + $locale)}
  </button>
  <div class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52" role="menu">
    {#each languages as lang}
      <button
        class="btn btn-ghost btn-sm justify-start {$locale === lang.code ? 'btn-active' : ''}"
        on:click={() => setLanguage(lang.code)}
        role="menuitem"
      >
        {lang.name}
      </button>
    {/each}
  </div>
</div>