import { Filter } from '@/stores/browse-store'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Label } from '../ui/label'
import { COLLECTIONS, COUNTRIES, INDUSTRIES, SECTORS } from '@/lib/browse-filtering'

export type BrowseFilterProps = {
  filter: Filter
  currentFilter: Filter
  setFilter: () => void
  currentTab: string
}

export const BrowseFilter = (props: BrowseFilterProps) => {
  const { filter, currentFilter, setFilter, currentTab } = props

  return (
    <Popover defaultOpen={false}>
      <PopoverTrigger>
        <Button variant='outline'>Filter</Button>
      </PopoverTrigger>
      <PopoverContent className='w-100' onCloseAutoFocus={() => setFilter()}>
        <div className='flex'></div>
        {currentTab === 'all' ? (
          <div>
            <Label>Sectors</Label>
            <Select
              defaultValue={currentFilter.sector.value}
              onValueChange={(value) => (filter.sector = SECTORS.find((sector) => sector.value === value)!)}
            >
              <SelectTrigger className='min-1/4'>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {SECTORS.map((sector) => (
                  <SelectItem value={sector.value}>{sector.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label className='flex mt-3 mb-1'>Industry</Label>
            <Select
              defaultValue={currentFilter.industry.value}
              onValueChange={(value) => (filter.industry = INDUSTRIES.find((industry) => industry.value === value)!)}
            >
              <SelectTrigger className='min-1/4'>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {INDUSTRIES.map((industry) => (
                  <SelectItem value={industry.value}>{industry.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label className='flex mt-3 mb-1'>Country</Label>
            <Select
              defaultValue={currentFilter.country.value}
              onValueChange={(value) => (filter.country = COUNTRIES.find((country) => country.value === value)!)}
            >
              <SelectTrigger className='min-1/4'>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem value={country.value}>{country.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          ''
        )}

        <Label className='flex mt-3 mb-1'>Collection</Label>
        <Select
          defaultValue={currentFilter.collection.value}
          onValueChange={(value) => (filter.collection = COLLECTIONS.find((topic) => topic.value === value)!)}
        >
          <SelectTrigger className='min-1/4'>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {COLLECTIONS.map((collection) => (
              <SelectItem value={collection.value}>{collection.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button className='w-full mt-3' onClick={() => setFilter()}>
          Save Filters
        </Button>
      </PopoverContent>
    </Popover>
  )
}
