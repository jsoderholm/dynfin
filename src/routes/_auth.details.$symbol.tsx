import DetailsPresenter from '@/presenters/details-presenter'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/details/$symbol')({
  component: DetailsPresenter,
})
