<script lang="ts">
  import Post from '../../lib/post.svelte'

  let title = ''
  let author = ''
  let content = ''

  type State = 'editing' | 'previewing'
  let state: State = 'editing'

  let post
  $: post = {
    id: 0,
    title: title ?? '',
    author: author ?? '',
    content: content ?? '',
  }

  let searchPostState = ''

  function toggleState() {
    switch (state) {
      case 'editing':
        state = 'previewing'
        break
      case 'previewing':
        state = 'editing'
        break
    }
  }
</script>

<form method="post" action="/posts">
  {#if state === 'editing'}
    <p>
      <input
        type="text"
        placeholder="Title"
        name="title"
        minlength="3"
        maxlength="100"
        bind:value={title}
      />
      <input
        type="text"
        placeholder="By"
        name="author"
        minlength="3"
        maxlength="100"
        bind:value={author}
      />
    </p>
    <p>
      <textarea
        placeholder="Content"
        rows="20"
        name="content"
        minlength="10"
        maxlength="10000"
        bind:value={content}
      ></textarea>
    </p>
  {:else}
    <Post post={post} />
  {/if}
  <p>
    <button on:click|preventDefault={_ => toggleState()}>Preview</button>
    <button>Send</button>
  </p>
</form>
