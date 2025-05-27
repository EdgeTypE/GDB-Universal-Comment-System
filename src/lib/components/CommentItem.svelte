<script lang="ts">
  import { _ } from 'svelte-i18n';
  import type { Comment } from '../types';
  import { formatDate } from '../utils/date';
  import CommentForm from './CommentForm.svelte';

  export let comment: Comment;
  export let currentUrl: string;
  export let onReplyAdd: (comment: Comment) => void;

  let showReplyForm = false;

  const toggleReplyForm = () => {
    showReplyForm = !showReplyForm;
  };

  $: formattedDate = formatDate(comment.timestamp);

  const handleReplySuccess = (newComment: Comment) => {
    onReplyAdd(newComment);
    showReplyForm = false;
  };
</script>

<div class="comment-card group">
  <div class="comment-header">
    <div class="flex items-center gap-2">
      <div class="avatar placeholder">
        <div class="bg-primary/10 text-primary rounded-full w-8">
          <span class="text-sm">{comment.username[0].toUpperCase()}</span>
        </div>
      </div>
      <div>
        <span class="comment-author">{comment.username}</span>
        <time class="comment-time block" datetime={comment.timestamp}>{formattedDate}</time>
      </div>
    </div>
    <button 
      class="reply-button opacity-0 group-hover:opacity-100"
      on:click={toggleReplyForm}
    >
      {#if showReplyForm}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        {$_('cancel')}
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        {$_('reply')}
      {/if}
    </button>
  </div>

  <p class="comment-text mt-3">{comment.text}</p>

  {#if showReplyForm}
    <div class="mt-4 comment-reply-form">
      <CommentForm 
        {currentUrl}
        parentId={comment.comment_id}
        onSuccess={handleReplySuccess}
      />
    </div>
  {/if}

  {#if comment.replies && comment.replies.length > 0}
    <div class="comment-thread" role="list">
      {#each comment.replies as reply (reply.comment_id)}
        <svelte:self
          comment={reply}
          {currentUrl}
          {onReplyAdd}
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  .comment-reply-form {
    @apply -mx-4 -mb-4 rounded-b-lg;
    @apply bg-base-300/10 p-4;
  }
</style>