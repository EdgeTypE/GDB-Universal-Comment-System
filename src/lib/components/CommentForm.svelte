<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { postComment } from '../services/api';
  import type { Comment } from '../types';

  export let currentUrl: string;
  export let parentId: number | null = null;
  export let onSuccess: (comment: Comment) => void;

  let username = '';
  let text = '';
  let isSubmitting = false;
  let error: string | null = null;
  let formElement: HTMLFormElement;

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !text.trim()) {
      error = $_('error.required');
      return;
    }

    try {
      isSubmitting = true;
      error = null;

      const comment = await postComment(
        {
          username: username.trim(),
          text: text.trim(),
          answer_comment_id: parentId
        },
        currentUrl
      );

      onSuccess(comment);
      
      // Formu temizle
      username = '';
      text = '';
      
      // Form başarılı animasyonu
      formElement.classList.add('success');
      setTimeout(() => {
        formElement.classList.remove('success');
      }, 1000);
      
    } catch (err) {
      error = err instanceof Error ? err.message : $_('error.posting');
      console.error('Error:', err);
      
      // Hata animasyonu
      formElement.classList.add('error');
      setTimeout(() => {
        formElement.classList.remove('error');
      }, 1000);
    } finally {
      isSubmitting = false;
    }
  };
</script>

<form 
  class="comment-form"
  on:submit={handleSubmit}
  bind:this={formElement}
>
  {#if error}
    <div class="alert alert-error mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      <span>{error}</span>
    </div>
  {/if}

  <div class="form-control w-full">
    <label class="label" for="username">
      <span class="label-text">{$_('form.username')}</span>
    </label>
    <input
      type="text"
      id="username"
      bind:value={username}
      class="input input-bordered w-full"
      placeholder={$_('form.anonymous')}
      maxlength="50"
      disabled={isSubmitting}
    />
  </div>

  <div class="form-control w-full mt-4">
    <label class="label" for="comment">
      <span class="label-text">{$_('comment')}</span>
    </label>
    <textarea
      id="comment"
      bind:value={text}
      class="textarea textarea-bordered w-full min-h-[100px]"
      rows="3"
      maxlength="500"
      placeholder={$_('form.commentPlaceholder')}
      disabled={isSubmitting}
    ></textarea>
  </div>

  <button
    type="submit"
    class="btn btn-primary mt-6 w-full"
    disabled={isSubmitting}
  >
    {#if isSubmitting}
      <svg class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {/if}
    {parentId === null ? $_('form.submit') : $_('form.reply')}
  </button>
</form>

<style>
  .comment-form {
    @apply transition-all duration-300;
  }
  
  .comment-form.success {
    @apply ring-2 ring-success/30 scale-[1.01];
  }
  
  .comment-form.error {
    @apply ring-2 ring-error/30 scale-[1.01];
  }
  
  .textarea {
    @apply resize-y;
  }
</style>