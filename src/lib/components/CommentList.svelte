<script lang="ts">
  import type { Comment } from '../types';
  import CommentItem from './CommentItem.svelte';

  export let comments: Comment[];
  export let currentUrl: string;
  export let onCommentAdd: (comment: Comment) => void;
</script>

<div class="space-y-4">
  {#each comments as comment (comment.comment_id)}
    <CommentItem 
      {comment}
      {currentUrl}
      onReplyAdd={onCommentAdd}
    />
  {/each}
</div>