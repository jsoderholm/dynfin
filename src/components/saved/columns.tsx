import type { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<{
  symbol: string
  name: string
}>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'symbol',
    header: 'Symbol',
  },
]
