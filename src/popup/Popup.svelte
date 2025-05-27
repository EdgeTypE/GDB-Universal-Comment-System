<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { getComments, buildCommentTree } from '../lib/services/api';
  import type { Comment } from '../lib/types';
  import CommentList from '../lib/components/CommentList.svelte';
  import CommentForm from '../lib/components/CommentForm.svelte';
  import LanguageSelector from '../lib/components/LanguageSelector.svelte';
  import ThemeToggle from '../lib/components/ThemeToggle.svelte';
  import Footer from '../lib/components/Footer.svelte';

  let comments: Comment[] = [];
  let isLoading = true;
  let error: string | null = null;
  let currentUrl = '';

  onMount(async () => {
    try {
      // Chrome API ile aktif sekmenin URL'sini al
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      currentUrl = tab.url || '';

      if (currentUrl) {
        const fetchedComments = await getComments(currentUrl);
        comments = buildCommentTree(fetchedComments);
      }
    } catch (err) {
      error = err instanceof Error ? err.message : $_('error.loading');
      console.error('Error:', err);
    } finally {
      isLoading = false;
    }
  });

  const handleNewComment = (comment: Comment) => {
    if (comment.answer_comment_id === null) {
      comments = [...comments, comment];
    } else {
      comments = comments.map(c => {
        if (c.comment_id === comment.answer_comment_id) {
          return {
            ...c,
            replies: [...(c.replies || []), comment]
          };
        }
        return c;
      });
    }
  };
</script>

<div class="flex flex-col min-h-screen bg-base-100">
  <header class="sticky top-0 z-10 bg-base-100/95 backdrop-blur-sm px-4 pt-4 pb-4 border-b border-base-200">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {$_('comments')}
        </h1>
        <p class="text-sm text-base-content/70 mt-1 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
          </svg>
          <span class="truncate max-w-[300px]" title={currentUrl}>{currentUrl}</span>
        </p>
      </div>
      <div class="flex items-center gap-2">
        <ThemeToggle />
        <LanguageSelector />
      </div>
    </div>
  </header>

  <main class="flex-1 p-4">
    {#if isLoading}
      <div class="flex flex-col items-center justify-center h-40 gap-3">
        <div class="loading loading-spinner loading-lg text-primary"></div>
        <p class="text-base-content/70">{$_('loading')}</p>
      </div>
    {:else if error}
      <div class="alert alert-error shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error}</span>
      </div>
    {:else}
      <div class="space-y-6">
        <CommentForm {currentUrl} onSuccess={handleNewComment} />
        
        {#if comments.length === 0}
          <div class="flex flex-col items-center justify-center py-12 text-base-content/70">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p>{$_('noComments')}</p>
          </div>
        {:else}
          <CommentList {comments} {currentUrl} onCommentAdd={handleNewComment} />
        {/if}
      </div>
    {/if}
  </main>

  <Footer />
</div>

<style>
  :global(html) {
    min-width: 400px;
  }
</style>