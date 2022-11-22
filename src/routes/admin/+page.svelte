<script lang="ts">
  import { localMarked as marked } from '../../lib/md'

  let page = 1
  let limit = 6
  let searchInput = ''
  let state = 'pending'
  const fetchPosts = (async () => {
    const url = new URL('/admin/api/posts', window.location.origin)
    const params = new URLSearchParams(window.location.search)
    if (searchInput) {
      params.set('search_input', encodeURIComponent(searchInput))
    }
    if (state !== '*') {
      params.set('state', encodeURIComponent(state))
    }
    params.set('page', page.toString())
    params.set('limit', limit.toString())
    url.search = params.toString()
    return (await fetch(url)).json()
  })
  let postsPromise = fetchPosts()

  const updatePost = (post) => {
    fetch(
      '/admin/api/posts',
      {
        method: 'PUT',
        body: JSON.stringify(post),
      },
    ).then(() => {
    })
  }
  const deletePost = (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      fetch(
        '/admin/api/post/' + id.toString(),
        {
          method: 'DELETE',
        },
      ).then(() => {
      })
      return true
    }
    return false
  }
</script>

<p>
  <input
    type="text"
    placeholder="Search input"
    bind:value={searchInput}
  />
  <select
    bind:value={state}
    on:change={e => postsPromise = fetchPosts()}
  >
    <option value="*">All</option>
    <option value="accepted">Accepted</option>
    <option value="pending">Pending</option>
    <option value="rejected">Rejected</option>
  </select>
</p>

{#await postsPromise}
  <p>Loading posts...</p>
{:then fetchedPosts}
  {#each fetchedPosts as post}
    <article>
      <p>
        <input
          type="number"
          value={post.id}
          style="width: 3em"
          disabled
        >
        <input
          type="text"
          placeholder="Title"
          name="title"
          bind:value={post.title}
        />
        <input
          type="text"
          placeholder="By"
          name="author"
          bind:value={post.author}
        />
      </p>
      <p>
        <textarea
          placeholder="Content"
          rows="20"
          cols="52"
          name="content"
          bind:value={post.content}
        ></textarea>
        <select bind:value={post.state}>
          <option value="accepted">Accepted</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
        <button on:click={e => updatePost(post)}>
          Save
        </button>
        <button on:click={e => { deletePost(post.id) && (postsPromise = fetchPosts())}}>
          Delete
        </button>
      </p>
    </article>
  {/each}
{:catch error}
  <p>Error loading posts: {error}</p>
{/await}

<p>
  <button
    on:click={_ => {
      if (page > 1) {
        page -= 1
        postsPromise = fetchPosts()
      }
  }}
  > {'<'} </button>
  <input
    type="number"
    min="1"
    style="width: 4em"
    bind:value={page}
    on:keyup={e => e.key === 'Enter' && fetchPosts()}
  />
  <button
    on:click={_ => {
      page += 1
      postsPromise = fetchPosts()
  }}
  > {'>'} </button>
</p>


