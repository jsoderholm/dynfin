import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/saved')({
  component: () => <div>Hello /saved!</div>,
})
