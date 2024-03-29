import { auth } from '@/lib/firebase'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ location }) => {
    await auth.authStateReady()

    if (!auth.currentUser) {
      throw redirect({
        to: '/authentication',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})
