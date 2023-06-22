import type { PageServerLoad } from './$types'
import type { PostRecord } from '../data/posts'
import { findPostsV2, countPostsBySearchInput, countPosts } from '../data/posts'
import { DEFAULT_TITLE } from '$env/static/private'

export const load: PageServerLoad = async ({url}) => {
  const page = Number.parseInt(
    url.searchParams.get('page')
    ?? '1'
  )
  const limit = Number.parseInt(
    url.searchParams.get('limit')
    ?? '6'
  )
  let total: number
  const searchInput = url.searchParams.get('search_input') ?? ''
  let posts: PostRecord[] = findPostsV2({
    searchInput,
    state: 'accepted',
    page,
    limit,
  })
  if (searchInput) {
    total = countPostsBySearchInput({input: searchInput})
  } else {
    total = countPosts({state: 'accepted'})
  }
  return {
    posts,
    total,
    title: DEFAULT_TITLE,
  }
}
