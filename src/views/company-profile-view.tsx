import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CompanyProfile } from '@/lib/api/finage'

interface CompanyProfileProps {
  info: CompanyProfile
}

function CompanyProfileView({ info }: CompanyProfileProps) {
  const { name, description, address, exchange, industry, sector, employees, ceo, marketcap, state } = info

  return (
    <div>
      <div className='flex justify-between'>
        <h2 className='text-3xl font-semibold pb-6'>{name}</h2>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-x-6'>
        <Card className='col-span-1 '>
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-2 gap-x-8 gap-y-3 '>
            <InfoLabel label='CEO' value={ceo} />
            <InfoLabel label='Marketcap' value={marketcap.toString()} />
            <InfoLabel label='Address' value={address} />
            <InfoLabel label='Industry' value={industry} />
            <InfoLabel label='State' value={state} />
            <InfoLabel label='Exchange' value={exchange} />
            <InfoLabel label='Sector' value={sector} />
            <InfoLabel label='Employees' value={employees.toString()} />
          </CardContent>
        </Card>
        <Card className='col-span-2'>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface InfoLabelProps {
  label: string
  value: string
}

const InfoLabel = ({ label, value }: InfoLabelProps) => {
  return (
    <div>
      <p className='text-muted-foreground'>{label}</p>
      <p className='font-medium'>{value}</p>
    </div>
  )
}

export default CompanyProfileView
