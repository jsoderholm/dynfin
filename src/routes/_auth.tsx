import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context, location }) => {
    await context.auth.authStateReady()

    if (!context.auth.currentUser) {
      throw redirect({
        to: '/authentication',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})
