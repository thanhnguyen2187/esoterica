<script lang="ts">
  import type { PostRecord } from '../data/posts'
  import { localMarked as marked } from './md'

  export let post: PostRecord
  export let expanded = false
  let contentParagraphs = (
    post
    .content
    .split('\n')
    .filter(paragraph => paragraph)
  )
</script>
<article>
  <h2>
    <a href={'/post/' + post.id}>
      {post.title}
    </a>
  </h2>
  <div style="display: flex; gap: 2em; justify-content: space-between;">
    {#if post.author}
      <p>
        {post.author}
      </p>
    {/if}
    {#if post.created_at}
      <p>
        {post.created_at}
      </p>
    {/if}
  </div>
  {#if expanded}
    {@html marked(post.content)}
    {#if contentParagraphs.length > 1}
      <button on:click={_ => expanded = false}>Hide</button>
    {/if}
  {:else}
    {@html marked(contentParagraphs[0])}
    {#if contentParagraphs.length > 1}
      <button on:click={_ => expanded = true}>Show</button>
    {/if}
  {/if}
</article>
