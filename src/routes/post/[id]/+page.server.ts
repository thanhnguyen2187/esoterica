import type { PageServerLoad } from './$types';
import type { PostRecord } from '../../../data/posts'
import { findPost, findRandomPostId } from '../../../data/posts'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({params}) => {
  let post: PostRecord
  const idString = params.id
  if (idString == "random") {
    const id = findRandomPostId()
    throw redirect(307, '/post/' + id)
  } else {
    const id = Number.parseInt(idString)
    post = findPost({id})
  }
  return {
    post,
    title: post.title,
  };
}
