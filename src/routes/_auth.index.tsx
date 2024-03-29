import BrowsePresenter from '@/presenters/browse-presenter'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/')({
  component: () => <BrowsePresenter />,
})
