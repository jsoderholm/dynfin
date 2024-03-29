import SavedPresenter from '@/presenters/saved-presenter'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/saved')({
  component: () => <SavedPresenter />,
})
