import useSavedStore from '@/stores/saved-store'
import SavedView from '@/views/saved-view'

function SavedPresenter() {
  useSavedStore()
  // const _store = useSavedStore()
  // Use the data from the store to render the view

  return <SavedView />
}

export default SavedPresenter
