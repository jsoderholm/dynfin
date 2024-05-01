import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GraphInfo } from '@/lib/api/finage'
import { IconFilter, IconRefresh } from '@tabler/icons-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface GraphViewProps {
  info: GraphInfo
  onRefresh: () => void
  interval: string
  setInterval: (value: string) => void
  checked: string[]
  setChecked: (value: string) => void
}

function GraphView({ info, onRefresh, interval, setInterval, checked, setChecked }: GraphViewProps) {
  const { results } = info

  const filteredResults = results.slice(0, parseInt(interval))

  return (
    <div>
      <div className='flex justify-between'>
        <h2 className='text-3xl font-semibold pb-6'>Performance</h2>
        <Button onClick={onRefresh} size='icon' variant='secondary'>
          <IconRefresh />
        </Button>
      </div>
      <div>
        <Card>
          <CardHeader>
            <div className='flex justify-end'>
              <CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='sm' className='gap-2'>
                      <IconFilter className='h-4 w-4' />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={interval} onValueChange={setInterval}>
                      <DropdownMenuRadioItem value='3'>3 day</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value='5'>5 day</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value='7'>7 day</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value='14'>14 day</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={checked.includes('h')}
                      onCheckedChange={() => setChecked('h')}
                      className='text-primary'
                    >
                      High
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={checked.includes('l')}
                      onCheckedChange={() => setChecked('l')}
                      className='text-blue-700'
                    >
                      Low
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={checked.includes('c')}
                      onCheckedChange={() => setChecked('c')}
                      className='text-red-700'
                    >
                      Close
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={500}>
              <AreaChart width={500} height={400} data={filteredResults}>
                <defs>
                  <linearGradient id='colorC' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#B91C1C' stopOpacity={0.5} />
                    <stop offset='95%' stopColor='#B91C1C' stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id='colorH' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='hsl(var(--primary)' stopOpacity={0.5} />
                    <stop offset='95%' stopColor='hsl(var(--primary)' stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id='colorL' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#1D4ED8' stopOpacity={0.6} />
                    <stop offset='95%' stopColor='#1D4ED8' stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis domain={['dataMin', 'dataMax']} />
                <Tooltip />
                {checked.includes('h') && (
                  <Area type='monotone' dataKey='h' stroke='hsl(var(--primary))' fillOpacity={1} fill='url(#colorH)' />
                )}
                {checked.includes('l') && (
                  <Area type='monotone' dataKey='l' stroke='blue' fillOpacity={1} fill='url(#colorL)' />
                )}
                {checked.includes('c') && (
                  <Area type='monotone' dataKey='c' stroke='red' fillOpacity={1} fill='url(#colorC)' />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default GraphView
