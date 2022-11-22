import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit'
import type { PostRecord } from '../../data/posts'
import { createNewPost } from '../../data/posts'

function toPostRecord(formData: FormData): PostRecord {
  const post: { [_: string]: string } = {}
  formData.forEach(
    // @ts-ignore
    (value, key) => post[key] = value
  )
  // @ts-ignore
  return post
}

export const actions: Actions = {
  default: async ({request}) => {
    const formData = await request.formData()
    const post = toPostRecord(formData)
    createNewPost(post)
    throw redirect(307, '/thanks')
  }
}
