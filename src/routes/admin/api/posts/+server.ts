import type { RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'
import { findPostsV2, updatePost } from '../../../../data/posts'

export const GET: RequestHandler = ({url}) => {
  const page = Number.parseInt(url.searchParams.get('page') ?? '1')
  const limit = Number.parseInt(url.searchParams.get('limit') ?? '6')
  const searchInput = url.searchParams.get('search_input') ?? ''
  const state = url.searchParams.get('state') ?? '*'
  return json(findPostsV2({page, limit, state, searchInput}))
}

export const PUT: RequestHandler = async ({request}) => {
  updatePost(await request.json())
  return json({message: 'ok'})
}
