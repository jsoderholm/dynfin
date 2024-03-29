import AuthenticationPresenter from '@/presenters/authentication-presenter'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/authentication')({
  component: AuthenticationPresenter,
})
