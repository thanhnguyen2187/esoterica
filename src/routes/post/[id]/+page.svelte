<script lang="ts">
  import type { PageServerData } from './$types';
  import Post from '../../../lib/post.svelte';

  export let data: PageServerData;
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<p>
  <Post post={data.post} expanded={true}/>
</p>
