import type { PageServerLoad } from './$types'
import { DEFAULT_TITLE } from '$env/static/private'

export const load: PageServerLoad = async ({url}) => {
  return {
    title: DEFAULT_TITLE,
  }
}
