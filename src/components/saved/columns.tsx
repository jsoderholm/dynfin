import type { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<{
  symbol: string
  name: string
}>[] = [
  {
    accessorKey: 'symbol',
    header: 'Symbol',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
]
