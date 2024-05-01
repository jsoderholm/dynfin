import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { GraphInfo } from '@/lib/api/finage'
import { IconRefresh } from '@tabler/icons-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface GraphViewProps {
  info: GraphInfo
  onRefresh: () => void
}

function GraphView({ info, onRefresh }: GraphViewProps) {
  const { results } = info

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
          <CardContent className='py-12'>
            <ResponsiveContainer width='100%' height={500}>
              <AreaChart width={500} height={400} data={results}>
                <defs>
                  <linearGradient id='colorC' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='red' stopOpacity={0.5} />
                    <stop offset='95%' stopColor='red' stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id='colorH' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='hsl(var(--primary)' stopOpacity={0.5} />
                    <stop offset='95%' stopColor='hsl(var(--primary)' stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id='colorL' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='blue' stopOpacity={0.6} />
                    <stop offset='95%' stopColor='blue' stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis domain={['dataMin', 'dataMax']} />
                <Tooltip />
                <Area type='monotone' dataKey='h' stroke='hsl(var(--primary))' fillOpacity={1} fill='url(#colorH)' />
                <Area type='monotone' dataKey='l' stroke='blue' fillOpacity={1} fill='url(#colorL)' />
                <Area type='monotone' dataKey='c' stroke='red' fillOpacity={1} fill='url(#colorC)' />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default GraphView
