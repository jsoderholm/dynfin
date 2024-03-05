import Authentication from '@/views/authentication'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/authentication')({
  component: Authentication,
})
