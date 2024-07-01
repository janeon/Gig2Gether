import type { Handle } from '@sveltejs/kit'
import { authenticateUser } from '$lib/utils' 

export const handle: Handle = async ({ event, resolve }) => {
  // get cookies from browser
  const session = event.cookies.get('session')

  if (!session) {
    // if there is no session load page as normal
    return await resolve(event)
  }
  event.locals.user = await authenticateUser(event)


  // find the user based on the session
  console.log("Running handle")

  // load page as normal
  return await resolve(event)
}
