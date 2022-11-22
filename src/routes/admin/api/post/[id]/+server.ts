import type { RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'
import { deletePost, findPostsV2, updatePost } from '../../../../../data/posts'

export const DELETE: RequestHandler = async ({params}) => {
  deletePost(
    Number.parseInt(params.id ?? '')
  )
  return json({message: 'ok'})
}
