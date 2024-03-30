import useBrowseStore from '@/stores/browse-store'
import BrowseView from '@/views/browse-view'

function BrowsePresenter() {
  useBrowseStore()
  // const _store = useBrowseStore()
  // Use the data from the store to render the view

  return <BrowseView />
}

export default BrowsePresenter
