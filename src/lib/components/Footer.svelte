<script lang="ts">
  import { _ } from 'svelte-i18n';

  const privacyUrl = "https://gaming-db.com/corporate/privacy-policy/";
  const termsUrl = "https://gaming-db.com/corporate/terms-of-service/";

  const openLink = (url: string) => {
    chrome.tabs.create({ url });
  };
</script>

<footer class="mt-auto pt-4 pb-2 px-4 text-center text-sm text-base-content/60 border-t border-base-200">
  <div class="flex justify-center gap-4">
    <button 
      class="hover:text-primary transition-colors" 
      on:click={() => openLink(privacyUrl)}
    >
      {$_('footer.privacy')}
    </button>
    <span>•</span>
    <button 
      class="hover:text-primary transition-colors"
      on:click={() => openLink(termsUrl)}
    >
      {$_('footer.terms')}
    </button>
  </div>
</footer>