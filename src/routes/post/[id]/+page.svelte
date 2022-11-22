<script lang="ts">
  import type { PageServerData } from './$types';
  import Post from '../../../lib/post.svelte';

  export let data: PageServerData;
</script>

<p>
  <Post post={data.post} expanded={true}/>
</p>
