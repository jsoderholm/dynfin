import { columns } from '@/components/saved/columns'
import { DataTable } from '@/components/saved/data-table'

interface SavedViewProps {
  savedData: {
    symbol: string
    name: string
  }[]
}

function SavedView({ savedData }: SavedViewProps) {
  return (
    <div className='container'>
      <div className='flex justify-between py-6'>
        <h2 className='text-3xl font-semibold'>Saved</h2>
      </div>
      <DataTable columns={columns} data={savedData} />
    </div>
  )
}

export default SavedView
