import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'

export type SearchProps = {
  currentSearch: string
  onSearch: (search: string) => void
  currentTab: string
  form: UseFormReturn<
    {
      search: string
    },
    unknown,
    undefined
  >
  formSchema: z.ZodObject<
    {
      search: z.ZodString
    },
    'strip',
    z.ZodTypeAny,
    {
      search: string
    },
    {
      search: string
    }
  >
}

export const BrowseSearch = ({ onSearch, currentTab, form, formSchema }: SearchProps) => {
  function onSubmit(values: z.infer<typeof formSchema>) {
    onSearch(values.search)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full'>
        <FormField
          control={form.control}
          name='search'
          render={({ field }) => (
            <FormItem className='w-full md:w-3/4 lg:w-3/4'>
              <FormControl>
                <Input placeholder='Search...' {...field} disabled={currentTab === 'trending'} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className='ml-1' type='submit' disabled={currentTab === 'trending'}>
          Search
        </Button>
      </form>
    </Form>
  )
}
