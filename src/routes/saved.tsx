import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/saved')({
  component: () => <div>Hello /saved!</div>,
})
