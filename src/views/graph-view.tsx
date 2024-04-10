import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
      <h2 className='text-3xl font-semibold pb-6'>Graph</h2>
      <div className='grid grid-cols-3 gap-6'>
        <Card className='col-span-3 xl:col-span-2'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle>Lorem Ipsum</CardTitle>
              <Button onClick={onRefresh} variant='ghost'>
                <IconRefresh className='ml-auto stroke-muted-foreground' />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={500}>
              <AreaChart width={500} height={400} data={results} className='mt-3'>
                <defs>
                  <linearGradient id='colorL' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id='colorC' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='hsl(var(--primary)' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='hsl(var(--primary)' stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis domain={['dataMin', 'dataMax']} />
                <Tooltip />
                <Area type='monotone' dataKey='c' stroke='hsl(var(--primary))' fillOpacity={1} fill='url(#colorC)' />
                <Area type='monotone' dataKey='l' stroke='hsl(var(--primary))' fillOpacity={1} fill='url(#colorL)' />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <div className='col-span-3 xl:col-span-1 grid grid-cols-3 gap-6'>
          <Card className='xl:col-span-3'>
            <CardHeader>
              <CardTitle>High</CardTitle>
              <CardDescription>Description</CardDescription>
            </CardHeader>
          </Card>
          <Card className='xl:col-span-3'>
            <CardHeader>
              <CardTitle>Low</CardTitle>
              <CardDescription>Description</CardDescription>
            </CardHeader>
          </Card>
          <Card className='xl:col-span-3'>
            <CardHeader>
              <CardTitle>Average</CardTitle>
              <CardDescription>Description</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default GraphView
