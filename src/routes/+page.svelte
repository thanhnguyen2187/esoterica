<script lang="ts">
  import { onMount } from 'svelte'
  import type { PageServerData } from './$types'
  import Post from '../lib/post.svelte'

  export let data: PageServerData

  let searchInput = ''
  let page = 1
  let limit = 6
  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search)
    searchInput = urlParams.get('search_input')
    page = Number.parseInt(urlParams.get('page') ?? '1')
    limit = Number.parseInt(urlParams.get('limit') ?? '6')
  })

  function redirectToSearch(searchInput: string) {
    const urlParams = new URLSearchParams(window.location.search)
    if (searchInput) {
      urlParams.set('search_input', searchInput)
    } else {
      urlParams.delete('search_input')
    }
    window.location.href = ''
    window.location.search = urlParams.toString()
  }

  function redirectToPage(pageNumber: number) {
    if (pageNumber < 1) {
      return
    }
    if (pageNumber > lastPage) {
      return
    }
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('page', pageNumber.toString())
    window.location.href = ''
    window.location.search = urlParams.toString()
  }

  const total: number = data.total
  let lastPage = 1
  $: lastPage = Math.ceil(total / limit)

</script>

<p>
  <input
    type="text"
    placeholder="Search input"
    bind:value={searchInput}
    on:keyup={e => e.key === 'Enter' && redirectToSearch(searchInput)}
  />
  <button on:click={_ => redirectToSearch(searchInput)}>Search</button>
</p>

{#each data.posts as post}
  <Post post={post}/>
{/each}

<p>
  <button on:click={_ => redirectToPage(page - 1)}> {'<'} </button>
  <input
    type="number"
    bind:value={page}
    min="1"
    max={lastPage}
    style="width: 4em"
    on:keyup={e => e.key === 'Enter' && redirectToPage(page)}
  /> / {lastPage}
  <button on:click={_ => redirectToPage(page + 1)}> > </button>
</p>
