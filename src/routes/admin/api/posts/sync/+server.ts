import type { RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'
import { syncPosts } from '../../../../../data/posts'

export const GET: RequestHandler = ({url}) => {
  syncPosts()
  return json({message: "ok"})
}
